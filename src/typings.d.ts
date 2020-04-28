/*
 * Extra typings definitions
 */

// Allow .json files imports
declare module '*.json';
declare module 'flickity';

// SystemJS module definition
declare var module: NodeModule;
interface NodeModule {
  id: string;
}
