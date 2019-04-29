/**
 * The Account service manages creating instances of Item, so go ahead and rename
 * that something that fits your app as well.
 */
export class Account {

  constructor(fields: any) {
    // Quick and dirty extend/assign fields to this model
    for (const f in fields) {
      // @ts-ignore
      this[f] = fields[f];
    }
  }

}

export interface Item {
  [prop: string]: any;
}
