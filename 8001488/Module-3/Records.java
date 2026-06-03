import java.util.*;
import java.util.stream.Collectors;

record Person(String name, int age) {}

class Records {
    public static void main(String[] args) {
        List<Person> people = new ArrayList<>();

        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();
        sc.nextLine();

        for (int i = 0; i < n; i++) {
            String name = sc.nextLine();
            int age = sc.nextInt();
            sc.nextLine();
            people.add(new Person(name, age));
        }

        for (Person p : people) {
            System.out.println(p);
        }

        List<Person> filtered = people.stream()
                .filter(p -> p.age() > 18)
                .collect(Collectors.toList());

        for (Person p : filtered) {
            System.out.println(p);
        }
    }
}