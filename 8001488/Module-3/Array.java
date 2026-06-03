import java.util.*;
class Array {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        System.out.print("Enter the size of the array: ");
        int n = sc.nextInt();
        int[] arr = new int[n];
        int sum=0;
        int mul=1;
        System.out.println("Enter values: ");
        for (int i = 0; i < n; i++) {
            arr[i] = sc.nextInt();
        }
        System.out.println("Array elements:");
        for (int i = 0; i < n; i++) {
            sum=sum+arr[i];
            mul=mul*arr[i];
        }
        System.out.println("Sum of array elements: " + sum);
        System.out.println("Product of array elements: " + mul);
    }
}