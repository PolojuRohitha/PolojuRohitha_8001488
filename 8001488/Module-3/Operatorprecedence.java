import java.util.*;
class Operatorprecedence
{
    public static void main(String args[])
    {
        int result1 = 10 + 5 * 2;
        System.out.println("Expression: 10 + 5 * 2");
        System.out.println("Result: " + result1);
        System.out.println("Explanation: 5 * 2 = 10, then 10 + 10 = 20\n");
        int result2 = (20 - 5) / 3;
        System.out.println("Expression: (20 - 5) / 3");
        System.out.println("Result: " + result2);
        System.out.println("Explanation: Parentheses first -> 20 - 5 = 15, then 15 / 3 = 5\n");
        int result3 = 8 + 12 / 4 % 3;
        System.out.println("Expression: 8 + 12 / 4 % 3");
        System.out.println("Result: " + result3);
        System.out.println("Explanation: Division and modulus have equal precedence and evaluate left to right: 12 / 4 = 3, then 3 % 3 = 0, then 8 + 0 = 8\n");
        int result4 = 5 + 2 * (3 + 4) - 6;
        System.out.println("Expression: 5 + 2 * (3 + 4) - 6");
        System.out.println("Result: " + result4);
        System.out.println("Explanation: Parentheses first -> 3 + 4 = 7, then multiplication -> 2 * 7 = 14, then addition/subtraction left to right -> 5 + 14 = 19, 19 - 6 = 13\n");
    }
}