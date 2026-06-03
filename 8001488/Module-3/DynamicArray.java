import java.util.*;
class DynamicArray {
    public static void main(String[] args) {
        ArrayList<String> arr = new ArrayList<>();
        Scanner sc = new Scanner(System.in);
        System.out.println("Enter the number of elements:");    
        int n = sc.nextInt();
        sc.nextLine();
        for(int i = 0; i < n; i++) {
            System.out.println("Enter element ");
            String name = sc.nextLine();
            arr.add(name);
        }
        System.out.println("Student Names: " + arr);
    }
}