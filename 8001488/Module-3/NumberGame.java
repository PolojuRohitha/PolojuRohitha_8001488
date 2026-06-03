import java.util.Random;
import java.util.Scanner;

class NumberGame {
    public static void main(String[] args) {
        Random rand = new Random();
        int target = rand.nextInt(100) + 1;
        Scanner sc = new Scanner(System.in);

        System.out.println("Guess the number between 1 and 100.");
        int attempts = 0;

        while (true) {
            System.out.print("Enter your guess: ");
            String line = sc.nextLine();
            int guess;
            try {
                guess = Integer.parseInt(line.trim());
            } catch (NumberFormatException e) {
                System.out.println("Please enter a valid integer.");
                continue;
            }

            attempts++;

            if (guess < target) {
                System.out.println("Too low. Try again.");
            } else if (guess > target) {
                System.out.println("Too high. Try again.");
            } else {
                System.out.println("Correct! You guessed the number in " + attempts + " attempts.");
                break;
            }
        }
    }
}