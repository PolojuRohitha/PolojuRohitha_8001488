import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;

public class TransactionHandling {

    static Connection connect() throws Exception {
        return DriverManager.getConnection("jdbc:sqlite:bank.db");
    }

    static void transfer(int fromId, int toId, int amount) {
        try {
            Connection con = connect();
            con.setAutoCommit(false);

            PreparedStatement debit = con.prepareStatement(
                "UPDATE accounts SET balance = balance - ? WHERE id = ?"
            );

            debit.setInt(1, amount);
            debit.setInt(2, fromId);
            debit.executeUpdate();

            PreparedStatement check = con.prepareStatement(
                "SELECT balance FROM accounts WHERE id = ?"
            );

            check.setInt(1, fromId);
            ResultSet rs = check.executeQuery();

            if (rs.next() && rs.getInt("balance") < 0) {
                con.rollback();
                System.out.println("Transaction Failed: Insufficient Balance");
                con.close();
                return;
            }

            PreparedStatement credit = con.prepareStatement(
                "UPDATE accounts SET balance = balance + ? WHERE id = ?"
            );

            credit.setInt(1, amount);
            credit.setInt(2, toId);
            credit.executeUpdate();

            con.commit();
            System.out.println("Transaction Successful");

            con.close();

        } catch (Exception e) {
            System.out.println("Error: " + e);
        }
    }

    public static void main(String[] args) {

        try {
            Class.forName("org.sqlite.JDBC");

            Connection con = connect();
            Statement st = con.createStatement();

            st.executeUpdate(
                "CREATE TABLE IF NOT EXISTS accounts (id INTEGER PRIMARY KEY, name TEXT, balance INTEGER)"
            );

            st.executeUpdate(
                "INSERT OR IGNORE INTO accounts VALUES (1, 'Alice', 5000)"
            );

            st.executeUpdate(
                "INSERT OR IGNORE INTO accounts VALUES (2, 'Bob', 3000)"
            );

            con.close();

        } catch (Exception e) {
            System.out.println(e);
        }

        transfer(1, 2, 1000);
    }
}