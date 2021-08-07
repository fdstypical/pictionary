import { observable, action, makeObservable } from 'mobx';

class App {
  @observable
  public sidebar: boolean = true;

  constructor() {
    makeObservable(this);
  }

  @action
  public toggleSidebar() {
    this.sidebar = !this.sidebar;
  }
}

export default App;
