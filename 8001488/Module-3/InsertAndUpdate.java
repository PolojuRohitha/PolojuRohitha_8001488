import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;

public class InsertAndUpdate {

    static Connection connect() throws Exception {
        return DriverManager.getConnection("jdbc:sqlite:student.db");
    }

    static void insertStudent(int id, String name, int age) {
        try {
            Connection con = connect();

            String sql = "INSERT INTO students (id, name, age) VALUES (?, ?, ?)";
            PreparedStatement ps = con.prepareStatement(sql);

            ps.setInt(1, id);
            ps.setString(2, name);
            ps.setInt(3, age);

            ps.executeUpdate();

            System.out.println("Inserted: " + name);

            con.close();
        } catch (Exception e) {
            System.out.println(e);
        }
    }

    static void updateStudent(int id, String name, int age) {
        try {
            Connection con = connect();

            String sql = "UPDATE students SET name = ?, age = ? WHERE id = ?";
            PreparedStatement ps = con.prepareStatement(sql);

            ps.setString(1, name);
            ps.setInt(2, age);
            ps.setInt(3, id);

            ps.executeUpdate();

            System.out.println("Updated ID: " + id);

            con.close();
        } catch (Exception e) {
            System.out.println(e);
        }
    }

    public static void main(String[] args) {

        try {
            Class.forName("org.sqlite.JDBC");

            insertStudent(1, "Alice", 20);
            insertStudent(2, "Bob", 21);
            insertStudent(3, "Charlie", 22);

            updateStudent(1, "Alice Johnson", 21);

        } catch (Exception e) {
            System.out.println(e);
        }
    }
}