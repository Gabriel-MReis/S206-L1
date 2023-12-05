package gorest_api;

import com.intuit.karate.junit5.Karate;

public class GoRestRunner {
    @Karate.Test
    Karate testGorest() {
        return Karate.run("gorest").relativeTo(getClass());
    }
}