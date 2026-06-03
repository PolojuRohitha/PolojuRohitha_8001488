import java.util.*;
class MethodOverloading {
    public static void main(String[] args) {
        System.out.println("Sum of 5 and 10: " + sum(5, 10));
        System.out.println("Sum of 5.5 and 10.5: " + sum(5.5, 10.5));
        System.out.println("Sum of 1, 2 and 3: " + sum(1, 2, 3));
    }

    public static int sum(int a, int b) {
        return a + b;
    }

    public static double sum(double a, double b) {
        return a + b;
    }

    public static int sum(int a, int b, int c) {
        return a + b + c;
    }
}