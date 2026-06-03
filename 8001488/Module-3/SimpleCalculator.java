import java.util.*;
class SimpleCalculator {
    public static void main(String[] args) {
        Scanner sc=new Scanner(System.in);
        System.out.println("Enter the first number:");
        int a=sc.nextInt();
        System.out.println("Enter the second number:");
        int b=sc.nextInt();
        System.out.println("Enter the operation (+, -, *, /):");
        int symbol=sc.next().charAt(0);
        int result=0;
        switch(symbol) {
            case '+':
                result=a+b;
                break;
            case '-':
                result=a-b;
                break;
            case '*':
                result=a*b;
                break;
            case '/':
                if(b!=0) {
                    result=a/b;
                } else {
                    System.out.println("Cannot divide by zero!");
                    return;
                }
                break;
            default:
                System.out.println("Invalid operation!");
                return;
        }
        System.out.println("Result: " + result);
    }
}