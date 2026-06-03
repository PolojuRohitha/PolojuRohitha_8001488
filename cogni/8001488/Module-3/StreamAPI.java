import java.util.*;
import java.util.stream.Collectors;
class StreamAPI {
    public static void main(String[] args) {
        List<Integer> l=new ArrayList<>();
        Scanner sc=new Scanner(System.in);
        int n=sc.nextInt();
        for(int i=0;i<n;i++){
            l.add(sc.nextInt());
        }
        List<Integer> evenNum=l.stream().filter(num->num%2==0).collect(Collectors.toList());
        System.out.println(evenNum);
    }
}