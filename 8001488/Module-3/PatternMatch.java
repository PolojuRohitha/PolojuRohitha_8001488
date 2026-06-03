class PatternMatch {

    static void checkObject(Object obj) {
        switch (obj) {
            case Integer i -> System.out.println("Integer value: " + i);
            case String s -> System.out.println("String value: " + s);
            case Double d -> System.out.println("Double value: " + d);
            case null -> System.out.println("Object is null");
            default -> System.out.println("Unknown type: " + obj.getClass().getSimpleName());
        }
    }

    public static void main(String[] args) {
        checkObject(10);
        checkObject("Hello");
        checkObject(10.5);
        checkObject(true);
        checkObject(null);
    }
}