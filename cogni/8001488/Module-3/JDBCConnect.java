import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;

class JDBCConnect {
    public static void main(String[] args) {
        try {
            Class.forName("org.sqlite.JDBC");

            Connection con = DriverManager.getConnection("jdbc:sqlite:student.db");

            Statement st = con.createStatement();

            st.executeUpdate("CREATE TABLE IF NOT EXISTS students (id INTEGER, name TEXT, age INTEGER)");

            st.executeUpdate("INSERT INTO students VALUES (1, 'Ravi', 20)");
            st.executeUpdate("INSERT INTO students VALUES (2, 'Anita', 21)");
            st.executeUpdate("INSERT INTO students VALUES (3, 'Kiran', 19)");

            ResultSet rs = st.executeQuery("SELECT * FROM students");

            while (rs.next()) {
                System.out.println(rs.getInt("id") + " " +
                                   rs.getString("name") + " " +
                                   rs.getInt("age"));
            }

            con.close();

        } catch (Exception e) {
            System.out.println(e);
        }
    }
}