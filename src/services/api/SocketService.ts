import { TypedMap } from '@/typings';

export enum Events {
  open = 'open',
  message = 'message',
  error = 'error',
  close = 'close',
}

export default class SocketService {
  protected listeners: TypedMap<Events, Function[]> = new Map();
  protected socket: WebSocket;

  constructor(url: string = String(process.env.WS_PATH)) {
    this.socket = new WebSocket(url);
    this.setSocketListeners();
  }

  protected setSocketListeners(): void {
    this.socket.addEventListener(Events.open, () => this.emit(Events.open));
    this.socket.addEventListener(Events.message, () => this.emit(Events.message));
    this.socket.addEventListener(Events.error, () => this.emit(Events.error));
    this.socket.addEventListener(Events.close, () => this.emit(Events.close));
  }

  protected emit(event: Events): void {
    const listeners = this.listeners.get(event);

    if (!listeners || listeners?.length === 0) {
      return;
    }

    listeners.forEach((cb) => cb());
  }

  public send(data: string | ArrayBufferLike | Blob | ArrayBufferView): void {
    this.socket.send(data);
  }

  public subscribe(event: Events, cb: Function): void {
    const subscribers = this.listeners.get(event) || [];
    this.listeners.set(event, [...subscribers, cb]);
  }

  public unsubscribe(event: Events, cb: Function): void {
    const subscribers = this.listeners.get(event) || [];

    this.listeners.set(
      event,
      subscribers.filter((fn) => fn !== cb),
    );
  }
}
