// Basic Types
const isDone: boolean = false;
const decimal: number = 6;
const hex: number = 0xf00d;
const binary: number = 0b1010;
const octal: number = 0o744;
const color: string = "blue";
const fullName: string = `Gene`;
const age: number = 37;
const sentence: string = `Hello, my name is ${fullName}. I'll be ${age + 1} years old next month.`;

// Arrays
const list: number[] = [1, 2, 3];
const list2: Array<number> = [1, 2, 3];

// Tuples
const x: [string, number] = ["hello", 10];

// Enums
enum Color {
  Red,
  Green,
  Blue,
}
const c: Color = Color.Green;

// Any
let notSure: unknown = 4;
notSure = "maybe a string instead";
notSure = false;

// Void
function warnUser(): void {
  console.log("This is my warning message");
}

// Null and Undefined
const u: undefined = undefined;
const n: null = null;

// Never
function errorFunction(message: string): never {
  throw new Error(message);
}

// Object
interface Point {
  readonly x: number;
  readonly y: number;
}

const p1: Point = { x: 10, y: 20 };

// Type assertions
const someValue: unknown = "this is a string";
const strLength: number = (someValue as string).length;

// Interfaces
interface LabelledValue {
  label: string;
}

function printLabel(labelledObj: LabelledValue) {
  console.log(labelledObj.label);
}

const myObj = { size: 10, label: "Size 10 Object" };
printLabel(myObj);

// Optional Properties
interface SquareConfig {
  color?: string;
  width?: number;
}

function createSquare(config: SquareConfig): { color: string; area: number } {
  const newSquare = { color: "white", area: 100 };
  if (config.color) {
    newSquare.color = config.color;
  }
  if (config.width) {
    newSquare.area = config.width * config.width;
  }
  return newSquare;
}

// Class Types
interface ClockInterface {
  currentTime: Date;
  setTime(d: Date): void;
}

class Clock implements ClockInterface {
  currentTime: Date = new Date();
  setTime(d: Date) {
    this.currentTime = d;
  }
  constructor(h: number, m: number) {}
}

// Extending Interfaces
interface Shape {
  color: string;
}

interface Square extends Shape {
  sideLength: number;
}

const square = {} as Square;
square.color = "blue";
square.sideLength = 10;

// Hybrid Types
interface Counter {
  (start: number): string;
  interval: number;
  reset(): void;
}

function getCounter(): Counter {
  const counter = function (start: number) {} as Counter;
  counter.interval = 123;
  counter.reset = function () {};
  return counter;
}

const c1 = getCounter();

// Classes
class Animal {
  name: string;
  constructor(theName: string) {
    this.name = theName;
  }
  move(distanceInMeters: number = 0) {
    console.log(`${this.name} moved ${distanceInMeters}m.`);
  }
}

class Snake extends Animal {
  constructor(name: string) {
    super(name);
  }
  override move(distanceInMeters = 5) {
    console.log("Slithering...");
    super.move(distanceInMeters);
  }
}

class Horse extends Animal {
  constructor(name: string) {
    super(name);
  }
  override move(distanceInMeters = 45) {
    console.log("Galloping...");
    super.move(distanceInMeters);
  }
}

const sam = new Snake("Sammy the Python");
const tom: Animal = new Horse("Tommy the Palomino");

sam.move(10);
tom.move(34);

// Public, Private, Protected modifiers
class Animal1 {
  private name: string;
  constructor(theName: string) {
    this.name = theName;
  }

  public move(distanceInMeters: number) {
    console.log(`${this.name} moved ${distanceInMeters}m.`);
  }
}

// Understanding protected
class Person {
  protected name: string;
  constructor(name: string) {
    this.name = name;
  }
}

class Employee extends Person {
  private department: string;

  constructor(name: string, department: string) {
    super(name);
    this.department = department;
  }

  public getElevatorPitch() {
    return `Hello, my name is ${this.name} and I work in ${this.department}.`;
  }
}

const howard = new Employee("Howard", "Sales");
console.log(howard.getElevatorPitch());

// Readonly modifier
class Octopus {
  readonly name: string;
  readonly numberOfLegs: number = 8;
  constructor(theName: string) {
    this.name = theName;
  }
}
const dad = new Octopus("Man with the 8 strong legs");

// Accessors
class Employee1 {
  private _fullName: string = "";

  get fullName(): string {
    return this._fullName;
  }

  set fullName(newName: string) {
    if (newName && newName.length > 0) {
      this._fullName = newName;
    }
  }
}

// Static Properties
class Grid {
  static origin = { x: 0, y: 0 };
  calculateDistanceFromOrigin(point: { x: number; y: number }) {
    const xDist = point.x - Grid.origin.x;
    const yDist = point.y - Grid.origin.y;
    return Math.sqrt(xDist * xDist + yDist * yDist) / this.scale;
  }
  constructor(public scale: number) {}
}

// Abstract Classes
abstract class Department {
  constructor(public name: string) {}

  printName(): void {
    console.log("Department name: " + this.name);
  }

  abstract printMeeting(): void; // Must be implemented in derived classes
}

class AccountingDepartment extends Department {
  constructor() {
    super("Accounting and Auditing"); // constructors in derived classes must call super()
  }

  printMeeting(): void {
    console.log("The Accounting Department meets at 10am.");
  }

  generateReports(): void {
    console.log("Generating accounting reports...");
  }
}

// Advanced Types

// Intersection Types
interface ErrorHandling {
  success: boolean;
  error?: { message: string };
}

interface ArtworksData {
  artworks: { title: string }[];
}

interface ArtistsData {
  artists: { name: string }[];
}

// These interfaces are composed to have consistent error handling, and their own data.
type ArtworksResponse = ArtworksData & ErrorHandling;
type ArtistsResponse = ArtistsData & ErrorHandling;

// Union Types
function padLeft(value: string, padding: string | number) {
  if (typeof padding === "number") {
    return Array(padding + 1).join(" ") + value;
  }
  if (typeof padding === "string") {
    return padding + value;
  }
  throw new Error(`Expected string or number, got '${padding}'.`);
}

// Type Guards
interface Fish {
  swim: () => void;
}

interface Bird {
  fly: () => void;
}

function isFish(pet: Fish | Bird): pet is Fish {
  return (pet as Fish).swim !== undefined;
}

// Type Aliases
type Name = string;
type NameResolver = () => string;
type NameOrResolver = Name | NameResolver;
function getName(n: NameOrResolver): Name {
  if (typeof n === "string") {
    return n;
  } else {
    return n();
  }
}

// Generics
function identity<T>(arg: T): T {
  return arg;
}

const output = identity<string>("myString");
const output2 = identity("myString"); // type argument inference

// Generic Interfaces
interface GenericIdentityFn<T> {
  (arg: T): T;
}

function identity2<T>(arg: T): T {
  return arg;
}

const myIdentity: GenericIdentityFn<number> = identity2;

// Generic Classes
class GenericNumber<T> {
  zeroValue: T = undefined as unknown as T;
  add: (x: T, y: T) => T = undefined as unknown as (x: T, y: T) => T;
}

const myGenericNumber = new GenericNumber<number>();
myGenericNumber.zeroValue = 0;
myGenericNumber.add = function (x, y) {
  return x + y;
};

// Generic Constraints
interface Lengthwise {
  length: number;
}

function loggingIdentity<T extends Lengthwise>(arg: T): T {
  console.log(arg.length); // Now we know it has a .length property, so no more error
  return arg;
}

// Using Type Parameters in Generic Constraints
function getProperty<T, K extends keyof T>(obj: T, key: K) {
  return obj[key];
}

const x1 = { a: 1, b: 2, c: 3, d: 4 };
getProperty(x1, "a"); // okay

// Using Class Types in Generics
function create<T>(c: new () => T): T {
  return new c();
}

class BeeKeeper {
  hasMask: boolean = true;
}

class ZooKeeper {
  nametag: string = "Mikle";
}

class Animal2 {
  numLegs: number = 4;
}

class Bee extends Animal2 {
  keeper: BeeKeeper = new BeeKeeper();
}

class Lion extends Animal2 {
  keeper: ZooKeeper = new ZooKeeper();
}

function createInstance<A extends Animal2>(c: new () => A): A {
  return new c();
}

// Modules
export interface StringValidator {
  isAcceptable(s: string): boolean;
}

// Declaration Merging
interface Box {
  height: number;
  width: number;
}

interface Box {
  scale: number;
}

const box: Box = { height: 5, width: 6, scale: 10 };

console.log("TypeScript learning examples loaded!");