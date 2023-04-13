import { IObservableStream, IStreamObserver } from "mobx-utils";

type AlmostStream<T> = {
  subscribe(next: (value: T) => void): () => void;
  subscribe(observer: IStreamObserver<T>): () => void;
};

export function correctStream<T>(
  almostStream: AlmostStream<T>
): IObservableStream<T> {
  return {
    subscribe(observer?: IStreamObserver<T> | ((value: T) => void) | null) {
      if (!observer) return { unsubscribe: () => {} };
      const unsubscribe = almostStream.subscribe(observer as any);
      return {
        unsubscribe,
      };
    },
  };
}
