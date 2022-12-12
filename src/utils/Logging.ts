import colors from 'colors';
export default class Logging {
  public static log = (args: any) => console.log(args);
  public static info = (args: any) => {
    console.log(
      colors.bgBlue(`[${new Date().toLocaleString()}] [INFO]`),
      typeof args === 'string' ? colors.blue(args) : args
    );
  };
  public static success = (args: any) => {
    console.log(
      colors.bgGreen(`[${new Date().toLocaleString()}] [info]`),
      typeof args === 'string' ? colors.green(args) : args
    );
  };
  public static warn = (args: any) => {
    console.log(
      colors.bgYellow(`[${new Date().toLocaleString()}] [info]`),
      typeof args === 'string' ? colors.yellow(args) : args
    );
  };
  public static error = (args: any) => {
    console.log(
      colors.bgRed(`[${new Date().toLocaleString()}] [info]`),
      typeof args === 'string' ? colors.red(args) : args
    );
  };
}
