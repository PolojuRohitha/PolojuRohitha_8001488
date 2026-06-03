class ClassAndObject {
    int id;
    String name;

    public ClassAndObject(int id, String name) {
        this.id = id;
        this.name = name;
    }

    public void display() {
        System.out.println("ID: " + id);
        System.out.println("Name: " + name);
    }

    public static void main(String[] args) {
        ClassAndObject obj1 = new ClassAndObject(1, "Alice");
        ClassAndObject obj2 = new ClassAndObject(2, "Bob");
        obj1.display();
        obj2.display();
    }
}