import { UserProps } from '../@types';

export class User implements UserProps {
  private _id: string;
  private _name: string;
  private _color: string;

  constructor(id: string, name: string, color: string) {
    this._id = id;
    this._name = name;
    this._color = color;
  }

  get id(): string {
    return this._id;
  }

  set id(id: string) {
    this._id = id;
  }

  get name(): string {
    return this._name;
  }

  set name(name: string) {
    this._name = name;
  }

  get color(): string {
    return this._color;
  }

  set color(color: string) {
    this._color = color;
  }
}
