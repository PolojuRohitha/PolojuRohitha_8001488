import java.util.HashMap;
import java.util.Scanner;
class HashMapEg {
    public static void main(String[] args) {
        HashMap<Integer, String> map = new HashMap<>();
        Scanner sc = new Scanner(System.in);
        System.out.println("Enter the number of entries:");
        int n = sc.nextInt();

        for (int i = 0; i < n; i++) {
            System.out.println("Enter ID for entry " + (i + 1) + ":");
            int id = sc.nextInt();
            sc.nextLine();
            System.out.println("Enter name for entry " + (i + 1) + ":");
            String name = sc.nextLine();
            map.put(id, name);
        }

        System.out.println("Enter ID to search:");
        int searchId = sc.nextInt();

        if (map.containsKey(searchId)) {
            System.out.println(map.get(searchId));
        } else {
            System.out.println("ID not found");
        }
    }
}