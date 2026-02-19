// Allow importing SVG files as URLs
declare module "*.svg" {
  const content: string;
  export default content;
}
