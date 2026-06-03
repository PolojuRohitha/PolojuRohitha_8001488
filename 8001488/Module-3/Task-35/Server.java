import java.io.*;
import java.net.*;

public class Server {
    public static void main(String[] args) {
        try {
            ServerSocket serverSocket = new ServerSocket(5000);
            System.out.println("Server started. Waiting for client...");

            Socket socket = serverSocket.accept();
            System.out.println("Client connected!");

            BufferedReader in = new BufferedReader(
                    new InputStreamReader(socket.getInputStream()));

            PrintWriter out = new PrintWriter(socket.getOutputStream(), true);

            BufferedReader console = new BufferedReader(
                    new InputStreamReader(System.in));

            String clientMsg, serverMsg;

            while (true) {
                // read client message
                clientMsg = in.readLine();
                if (clientMsg == null || clientMsg.equalsIgnoreCase("exit")) {
                    System.out.println("Client disconnected.");
                    break;
                }
                System.out.println("Client: " + clientMsg);

                // send reply
                System.out.print("Server: ");
                serverMsg = console.readLine();
                out.println(serverMsg);

                if (serverMsg.equalsIgnoreCase("exit")) {
                    break;
                }
            }

            socket.close();
            serverSocket.close();

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}