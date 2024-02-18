import { PageHolder } from "./abstractClasses";
import { Home } from "./pages/home.page";
import { Search } from "./pages/search.page";
import { About } from "./pages/about.page";
import { Register } from "./pages/registration.page";
import { Login } from "./pages/login.page";
import { Profile } from "./pages/profile.page";
import { Basket } from "./pages/basket.page";
import { Address } from "./pages/address.page";
import { Delivery } from "./pages/deliverymethod.page";
import { Payment } from "./pages/payment.page";
import { Order } from "./pages/order.page";
import { Completion } from "./pages/completion.page";

export class Application extends PageHolder {
  public home = new Home(this.page);
  public search = new Search(this.page);
  public about = new About(this.page);
  public register = new Register(this.page);
  public login = new Login(this.page);
  public profile = new Profile(this.page);
  public basket = new Basket(this.page);
  public address = new Address(this.page);
  public delivery = new Delivery(this.page);
  public payment = new Payment(this.page);
  public order = new Order(this.page);
  public completion = new Completion(this.page);
}
