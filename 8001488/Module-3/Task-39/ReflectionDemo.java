import java.lang.reflect.Method;
import java.lang.reflect.Parameter;

public class ReflectionDemo {
    public static void main(String[] args) {
        try {
            Class<?> cls = Class.forName("TestClass");

            Method[] methods = cls.getDeclaredMethods();

            for (Method m : methods) {
                System.out.println(m.getName());

                Parameter[] params = m.getParameters();
                for (Parameter p : params) {
                    System.out.println(p.getName() + " " + p.getType().getSimpleName());
                }
            }

            Object obj = cls.getDeclaredConstructor().newInstance();

            Method method = cls.getDeclaredMethod("add", int.class, int.class);
            Object result = method.invoke(obj, 5, 10);

            System.out.println(result);

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}