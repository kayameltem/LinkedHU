package darth.linkedhu.service.session;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.firestore.Firestore;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.google.firebase.cloud.FirestoreClient;
import lombok.Data;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.io.FileInputStream;
import java.io.InputStream;

@Data
@Service
public class SessionManager {

    @PostConstruct
    public void initialize(){
        try {
            InputStream serviceAccount = new FileInputStream(".\\bbm384-2022-demo-final-darth-ceng\\linkedhu\\src\\main\\resources\\serviceAccountKey.json");
            GoogleCredentials credentials = GoogleCredentials.fromStream(serviceAccount);

            FirebaseOptions options = new FirebaseOptions.Builder()
                    .setCredentials(credentials)
                    .setStorageBucket("linked-huceng.appspot.com")
                    .setDatabaseUrl("https://linked-huceng-default-rtdb.europe-west1.firebasedatabase.app")
                    .build();
            FirebaseApp.initializeApp(options);

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
    public Firestore getFirestore(){
        return FirestoreClient.getFirestore();
    }

}
