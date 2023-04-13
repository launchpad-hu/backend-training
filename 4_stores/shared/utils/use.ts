import { action, observable, onBecomeUnobserved } from "mobx";

export default function use<T>(value: Promise<T> | Subscribable<T>): T {
  if (value instanceof Promise) return use_promise(value);
  return use_subscribable(value);
}

// ------- Subscribable -------

export type Subscribable<T> = {
  subscribe(subscriber: Subscriber<T>): TeardownLogic;
};
export type Subscriber<T> = {
  next?(value: T): void;
  error?(error: any): void;
  complete?(): void;
};
export type TeardownLogic = (() => void) | { unsubscribe(): void } | void;

const DATA = Symbol("DATA");
interface withData<T> {
  [DATA]?: {
    pending: boolean;
    resolveFirst?: (t: T) => void;
    first?: Promise<T>;
    error?: any;
    unsubscribe?: TeardownLogic;
    value?: T;
  };
}
function use_subscribable<T>(stream: Subscribable<T>): T {
  console.log("use", stream);
  let data = (stream as any as withData<T>)[DATA];
  if (!data) {
    data = observable({
      pending: true,
      promise: undefined as Promise<T> | undefined,
    });
    (stream as any as withData<T>)[DATA] = data;
    data.first = new Promise<T>((r) => (data!.resolveFirst = r));
    data.unsubscribe = stream.subscribe({
      next: action((v) => {
        data!.value = v;
        if (data!.pending) {
          data!.resolveFirst?.(v);
          data!.resolveFirst = undefined;
          data!.pending = false;
        }
      }),
      error: action((e) => (data!.error = e)),
      complete: () => {},
    });

    onBecomeUnobserved(data, "pending", () => {
      delete (stream as any as withData<T>)[DATA];
      const { unsubscribe } = data!;
      if (!unsubscribe) return;
      if ("unsubscribe" in unsubscribe) (unsubscribe.unsubscribe as Function)();
      else unsubscribe();
    });
  }

  if (data.pending) throw (console.warn(data.first), data.first);
  if (data.error) throw (console.error(data.error), data.error);
  return console.info(data.value), data.value!;
}

// ------- Promise -------

const STATUS = Symbol("STATUS");
const VALUE = Symbol("VALUE");
const ERROR = Symbol("ERROR");

declare global {
  interface Promise<T> {
    [STATUS]?: "pending" | "resolved" | "rejected";
    [VALUE]: T;
    [ERROR]: any;
  }
}

function use_promise<T>(p: Promise<T>): T {
  if (p[STATUS] === "pending") {
    throw p;
  }
  if (p[STATUS] === "resolved") {
    return p[VALUE];
  }
  if (p[STATUS] === "rejected") {
    throw p[ERROR];
  }
  p[STATUS] = "pending";
  p.then(
    (value) => {
      p[STATUS] = "resolved";
      p[VALUE] = value;
    },
    (error) => {
      p[STATUS] = "rejected";
      p[ERROR] = error;
    }
  );
  throw p;
}
