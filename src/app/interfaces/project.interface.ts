import {ICircle} from "./circle.interface";

export interface IProject {
  id: any;
  name: string;
  circles: ICircle[];
}
