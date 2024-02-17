package darth.linkedhu.service;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.DocumentReference;
import com.google.cloud.firestore.DocumentSnapshot;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.WriteResult;
import com.google.firebase.cloud.FirestoreClient;
import darth.linkedhu.LinkedhuApplication;
import darth.linkedhu.entity.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.concurrent.ExecutionException;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Service
public class LoggerService {


    private Logger logger = LoggerFactory.getLogger(LinkedhuApplication.class);

    public String save(UserLog userLog) throws InterruptedException, ExecutionException {
        Firestore dbFirestore = FirestoreClient.getFirestore();
        ApiFuture<WriteResult> collectionsApiFuture = dbFirestore.collection("UserLogs").document(userLog.getEmail()).set(userLog);
        return collectionsApiFuture.get().getUpdateTime().toString();
    }

    public UserLog get(UserLog userLog) throws InterruptedException, ExecutionException {
        Firestore dbFirestore = FirestoreClient.getFirestore();
        DocumentReference documentReference = dbFirestore.collection("UserLogs")
                .document(userLog.getEmail());
        ApiFuture<DocumentSnapshot> future = documentReference.get();

        DocumentSnapshot document = future.get();

        UserLog userLog1 = null;

        if(document.exists()) {
            userLog1 = document.toObject(UserLog.class);
            return userLog1;
        }else {
            return null;
        }
    }

    public UserLog findUserByMailForLogs(String mail) throws ExecutionException, InterruptedException {

        Firestore dbFirestore = FirestoreClient.getFirestore();
        DocumentSnapshot documentSnapshot = null;
        System.out.println(mail);

        DocumentReference documentReference = dbFirestore.collection("UserLogs")
                .document(mail);
        ApiFuture<DocumentSnapshot> future = documentReference.get();
        DocumentSnapshot document = future.get();
        UserLog userLog = document.toObject(UserLog.class);

        return userLog;
    }
}
