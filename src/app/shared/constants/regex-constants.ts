export class RegexConstants {
  public static onlyLetters = "^[a-zA-Zа-яА-ЯіІЄє-]*$";
  public static email = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";
  public static phone = "^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[\\s\\./0-9]*$";
}
