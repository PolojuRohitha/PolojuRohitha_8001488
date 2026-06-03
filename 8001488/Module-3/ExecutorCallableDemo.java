import java.util.concurrent.Callable;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;

public class ExecutorCallableDemo {

    public static void main(String[] args) {
        ExecutorService executor = Executors.newFixedThreadPool(3);

        Callable<Integer> task1 = () -> {
            Thread.sleep(1000);
            return 10 + 20;
        };

        Callable<Integer> task2 = () -> {
            Thread.sleep(800);
            return 5 * 5;
        };

        Callable<Integer> task3 = () -> {
            Thread.sleep(500);
            return 100 / 4;
        };

        Future<Integer> f1 = executor.submit(task1);
        Future<Integer> f2 = executor.submit(task2);
        Future<Integer> f3 = executor.submit(task3);

        try {
            System.out.println(f1.get());
            System.out.println(f2.get());
            System.out.println(f3.get());
        } catch (InterruptedException | ExecutionException e) {
            e.printStackTrace();
        }

        executor.shutdown();
    }
}