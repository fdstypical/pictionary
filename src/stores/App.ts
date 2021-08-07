import { observable, action, makeObservable } from 'mobx';
import { IScreen, Orientations } from '@/typings';

const initScreen: IScreen = {
  width: 0,
  height: 0,
  orientation: Orientations.landscape,
};

class App {
  @observable
  public screen: IScreen = initScreen;

  @observable
  public sidebar: boolean = true;

  constructor() {
    makeObservable(this);
  }

  @action
  public setScreen(screen: IScreen) {
    this.screen = screen;
  }

  @action
  public toggleSidebar() {
    this.sidebar = !this.sidebar;
  }
}

export default App;
