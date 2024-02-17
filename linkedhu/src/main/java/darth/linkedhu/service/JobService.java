package darth.linkedhu.service;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.DocumentReference;
import com.google.cloud.firestore.DocumentSnapshot;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.WriteResult;
import com.google.firebase.cloud.FirestoreClient;
import darth.linkedhu.entity.Job;
import darth.linkedhu.entity.User;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.concurrent.ExecutionException;

@Service
public class JobService {

    public String save(Job job) throws ExecutionException, InterruptedException {

        Timestamp timestamp = new Timestamp(System.currentTimeMillis());
        job.setAnnouncementId(String.valueOf(timestamp.getTime()));

        UserService userService = new UserService();
        User owner = userService.findUserByMail(job.getOwner());
        if (owner != null) {
            job.setOwnerName(owner.getName() + " " + owner.getSurname());
        }

        Firestore dbFirestore = FirestoreClient.getFirestore();
        ApiFuture<WriteResult> collectionsApiFuture = dbFirestore.collection("Announcements")
                .document("Job").collection("Jobs").document(job.getAnnouncementId()).set(job);
        return collectionsApiFuture.get().getUpdateTime().toString();
    }

    public Job get(Job job) throws ExecutionException, InterruptedException {
        Firestore dbFirestore = FirestoreClient.getFirestore();
        DocumentReference documentReference = dbFirestore.collection("Announcements")
                .document("Job").collection("Jobs").document(job.getAnnouncementId());
        ApiFuture<DocumentSnapshot> future = documentReference.get();
        DocumentSnapshot document = future.get();

        Job job2 = null;

        if(document.exists()) {
            job2 = document.toObject(Job.class);
            return job2;
        }
        else {
            return null;
        }
    }

    public String update(Job job) throws ExecutionException, InterruptedException {
        Firestore dbFirestore = FirestoreClient.getFirestore();
        ApiFuture<WriteResult> collectionsApiFuture = dbFirestore.collection("Announcements")
                .document("Job").collection("Jobs").document(job.getAnnouncementId()).set(job);
        return collectionsApiFuture.get().getUpdateTime().toString();
    }

    public String delete(Job job) {
        Firestore dbFirestore = FirestoreClient.getFirestore();
        ApiFuture<WriteResult> writeResult = dbFirestore.collection("Announcements")
                .document("Job").collection("Jobs").document(job.getAnnouncementId()).delete();
        return "Document with Job Id: "+ job.getAnnouncementId() +" has been deleted";
    }
}
