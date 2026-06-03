import java.io.*;
import java.net.*;

public class Client {
    public static void main(String[] args) {
        try {
            Socket socket = new Socket("localhost", 5000);
            System.out.println("Connected to server!");

            BufferedReader in = new BufferedReader(
                    new InputStreamReader(socket.getInputStream()));

            PrintWriter out = new PrintWriter(socket.getOutputStream(), true);

            BufferedReader console = new BufferedReader(
                    new InputStreamReader(System.in));

            String clientMsg, serverMsg;

            while (true) {
                // send message
                System.out.print("Client: ");
                clientMsg = console.readLine();
                out.println(clientMsg);

                if (clientMsg.equalsIgnoreCase("exit")) {
                    break;
                }

                // receive response
                serverMsg = in.readLine();
                System.out.println("Server: " + serverMsg);
            }

            socket.close();

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}