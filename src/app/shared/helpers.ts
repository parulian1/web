import { HttpParams } from "@angular/common/http";

export function getSlugFromHref(href: string): string {
  const r = /^.+\/(.+?)\/$/.exec(href);
  if (r) {
    return r[1];
  }
  return null;
}

export function getSlugFromHrefFilter(href: string): string {
  const r = /^.+\/(.+?)\?([^;]*)$/.exec(href);
  if (r) {
    let params = new HttpParams({fromString: r[2]});
    return r[2];
  }
  return null;
}

export function getSlugFromHrefPrice(href: string): string {
  const r = /^.+\/(.+?)([^;]*)$/.exec(href);
  if (r) {
    return r[2];
  }
  return null;
}


/**
 * Takes a user's full name, and attempts to split their first, ane last name.
 *
 * Examples:
 *
 * "Derek Curtis" -> ["Derek", "Curtis"]
 * "Derek J. Curtis" -> ["Derek J." "Curtis"]
 * "Ramdani" -> ["Ramdani", null]
 *
 * @param fullName a user's full name
 * @returns {[string,string]}
 */
export function splitFirstLast(fullName: string): [string, string] {
  let result = /^(.+?)(\s+?(\w+))?$/.exec(fullName);

  // note: second value, if not matched (as in a single name given)
  // should EXPLICITLY be sent as null, not undefined
  // because JSON.stringify will completely skip keys with undefined values
  // when serializing to API.
  return [result[1], result[3] || null];
}

export function getParamValueFilter(paramValue: string, paramField: string): string {
  let params = new HttpParams({fromString: paramValue});
  return params.get(paramField);
}


export function titleCase(words: string): string {
  return words.toLowerCase().split(' ').map((word) => {
    return (word.charAt(0).toUpperCase() + word.slice(1));
  }).join(' ');
}
