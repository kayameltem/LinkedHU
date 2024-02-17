package darth.linkedhu.service;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.DocumentReference;
import com.google.cloud.firestore.DocumentSnapshot;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.WriteResult;
import com.google.firebase.cloud.FirestoreClient;
import darth.linkedhu.entity.Internship;
import darth.linkedhu.entity.User;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.concurrent.ExecutionException;

@Service
public class InternshipService {

    public String save(Internship internship) throws ExecutionException, InterruptedException {

        Timestamp timestamp = new Timestamp(System.currentTimeMillis());
        internship.setAnnouncementId(String.valueOf(timestamp.getTime()));

        UserService userService = new UserService();
        User owner = userService.findUserByMail(internship.getOwner());
        if (owner != null) {
            internship.setOwnerName(owner.getName() + " " + owner.getSurname());
        }

        Firestore dbFirestore = FirestoreClient.getFirestore();
        ApiFuture<WriteResult> collectionsApiFuture = dbFirestore.collection("Announcements")
                .document("Internship").collection("Internships")
                .document(internship.getAnnouncementId()).set(internship);
        return collectionsApiFuture.get().getUpdateTime().toString();
    }

    public Internship get(Internship internship) throws ExecutionException, InterruptedException {
        Firestore dbFirestore = FirestoreClient.getFirestore();
        DocumentReference documentReference = dbFirestore.collection("Announcements")
                .document("Internship").collection("Internships")
                .document(internship.getAnnouncementId());
        ApiFuture<DocumentSnapshot> future = documentReference.get();
        DocumentSnapshot document = future.get();

        Internship internship1 = null;

        if(document.exists()) {
            internship1 = document.toObject(Internship.class);
            return internship1;
        }
        else {
            return null;
        }
    }

    public String update(Internship internship) throws ExecutionException, InterruptedException {
        Firestore dbFirestore = FirestoreClient.getFirestore();
        ApiFuture<WriteResult> collectionsApiFuture = dbFirestore.collection("Announcements")
                .document("Internship").collection("Internships")
                .document(internship.getAnnouncementId()).set(internship);
        return collectionsApiFuture.get().getUpdateTime().toString();
    }

    public String delete(Internship internship) {
        Firestore dbFirestore = FirestoreClient.getFirestore();
        ApiFuture<WriteResult> writeResult = dbFirestore.collection("Announcements")
                .document("Internship").collection("Internships")
                .document(internship.getAnnouncementId()).delete();
        return "Document with Internship Id: "+ internship.getAnnouncementId() +" has been deleted";
    }
}
