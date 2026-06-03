import java.util.*;
class TypeCasting
{
    public static void main(String args[])
    {
        Scanner sc=new Scanner(System.in);
        System.out.println("Enter the number");
        double d=sc.nextDouble();
        int i=(int)d;
        System.out.println("The integer value is "+i);
        System.out.println("Enter the number");
        int a=sc.nextInt();
        double b=(double)a;
        System.out.println("The double value is "+b);
    }
}