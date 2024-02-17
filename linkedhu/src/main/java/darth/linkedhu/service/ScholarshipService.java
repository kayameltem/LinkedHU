package darth.linkedhu.service;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.DocumentReference;
import com.google.cloud.firestore.DocumentSnapshot;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.WriteResult;
import com.google.firebase.cloud.FirestoreClient;
import darth.linkedhu.entity.Scholarship;
import darth.linkedhu.entity.User;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.concurrent.ExecutionException;

@Service
public class ScholarshipService {
    public String save(Scholarship scholarship) throws ExecutionException, InterruptedException {

        Timestamp timestamp = new Timestamp(System.currentTimeMillis());
        scholarship.setAnnouncementId(String.valueOf(timestamp.getTime()));

        UserService userService = new UserService();
        User owner = userService.findUserByMail(scholarship.getOwner());
        if (owner != null) {
            scholarship.setOwnerName(owner.getName() + " " + owner.getSurname());
        }

        Firestore dbFirestore = FirestoreClient.getFirestore();
        ApiFuture<WriteResult> collectionsApiFuture = dbFirestore.collection("Announcements")
                .document("Scholarship").collection("Scholarships")
                .document(scholarship.getAnnouncementId()).set(scholarship);
        return collectionsApiFuture.get().getUpdateTime().toString();
    }

    public Scholarship get(Scholarship scholarship) throws ExecutionException, InterruptedException {
        Firestore dbFirestore = FirestoreClient.getFirestore();
        DocumentReference documentReference = dbFirestore.collection("Announcements")
                .document("Scholarship").collection("Scholarships")
                .document(scholarship.getAnnouncementId());
        ApiFuture<DocumentSnapshot> future = documentReference.get();
        DocumentSnapshot document = future.get();

        Scholarship scholarship1 = null;

        if(document.exists()) {
            scholarship1 = document.toObject(Scholarship.class);
            return scholarship1;
        }
        else {
            return null;
        }
    }

    public String update(Scholarship scholarship) throws ExecutionException, InterruptedException {
        Firestore dbFirestore = FirestoreClient.getFirestore();
        ApiFuture<WriteResult> collectionsApiFuture = dbFirestore.collection("Announcements")
                .document("Scholarship").collection("Scholarships")
                .document(scholarship.getAnnouncementId()).set(scholarship);
        return collectionsApiFuture.get().getUpdateTime().toString();
    }

    public String delete(Scholarship scholarship) {
        Firestore dbFirestore = FirestoreClient.getFirestore();
        ApiFuture<WriteResult> writeResult = dbFirestore.collection("Announcements")
                .document("Scholarship").collection("Scholarships")
                .document(scholarship.getAnnouncementId()).delete();
        return "Document with Scholarship Id: "+ scholarship.getAnnouncementId() +" has been deleted";
    }
}
