package fake_store_api;

import com.intuit.karate.junit5.Karate;

public class FakeStoreRunner {
    @Karate.Test
    Karate testFakeStore() {
        return Karate.run("fakestore").relativeTo(getClass());
    }
}
