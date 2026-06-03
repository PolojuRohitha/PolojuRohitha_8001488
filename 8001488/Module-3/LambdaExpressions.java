import java.util.*;
class LambdaExpressions {
    public static void main(String[] args) {
        List<String> l=new ArrayList<>();
        Scanner sc=new Scanner(System.in);
        int n=sc.nextInt();
        sc.nextLine();
        for(int i=0;i<n;i++){
            l.add(sc.nextLine());
        }
        Collections.sort(l,(s1,s2)->s1.compareTo(s2));
        System.out.println(l);
    }
}