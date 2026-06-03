class Animal {
    void makeSound() {
        System.out.println("Making a sound...");
    }
}
    class Dog extends Animal {
        void makeSound() {
            System.out.println("Bark!");
        }
    }
    class AnimalInheritance {
    public static void main(String[] args) {
    Animal a = new Dog();
    a.makeSound();
}
    }