import java.util.*;
class LeapYear {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter a year: ");
        int n = sc.nextInt();

        if (n % 4 == 0) {
            if (n % 100 != 0) {
                System.out.println("Leap Year");
            } else {
                if (n % 400 == 0) {
                    System.out.println("Leap Year");
                } else {
                    System.out.println("Not a Leap Year");
                }
            }
        } else {
            System.out.println("Not a Leap Year");
        }
    }
}