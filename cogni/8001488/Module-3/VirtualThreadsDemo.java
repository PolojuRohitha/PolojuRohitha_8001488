public class VirtualThreadsDemo {

    static void runVirtualThreads() throws Exception {
        long start = System.currentTimeMillis();

        Thread[] threads = new Thread[100000];

        for (int i = 0; i < 100000; i++) {
            threads[i] = Thread.startVirtualThread(() -> {
                System.out.println(Thread.currentThread());
            });
        }

        for (Thread t : threads) {
            t.join();
        }

        long end = System.currentTimeMillis();
        System.out.println("Virtual Threads Time: " + (end - start) + " ms");
    }

    static void runPlatformThreads() throws Exception {
        long start = System.currentTimeMillis();

        Thread[] threads = new Thread[1000];

        for (int i = 0; i < 1000; i++) {
            threads[i] = new Thread(() -> {
                System.out.println(Thread.currentThread());
            });
            threads[i].start();
        }

        for (Thread t : threads) {
            t.join();
        }

        long end = System.currentTimeMillis();
        System.out.println("Platform Threads Time: " + (end - start) + " ms");
    }

    public static void main(String[] args) throws Exception {
        runVirtualThreads();
        runPlatformThreads();
    }
}