package darth.linkedhu.service;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.DocumentReference;
import com.google.cloud.firestore.DocumentSnapshot;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.WriteResult;
import com.google.firebase.cloud.FirestoreClient;
import darth.linkedhu.entity.Project;
import darth.linkedhu.entity.User;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.Random;
import java.util.concurrent.ExecutionException;

@Service
public class ProjectService {
    public String save(Project project) throws ExecutionException, InterruptedException {

        Timestamp timestamp = new Timestamp(System.currentTimeMillis());
        project.setAnnouncementId(String.valueOf(timestamp.getTime()));

        UserService userService = new UserService();
        User owner = userService.findUserByMail(project.getOwner());
        if (owner != null) {
            project.setOwnerName(owner.getName() + " " + owner.getSurname());
        }

        Firestore dbFirestore = FirestoreClient.getFirestore();
        ApiFuture<WriteResult> collectionsApiFuture = dbFirestore.collection("Announcements")
                .document("Project").collection("Projects")
                .document(project.getAnnouncementId()).set(project);
        return collectionsApiFuture.get().getUpdateTime().toString();
    }

    public Project get(Project project) throws ExecutionException, InterruptedException {
        Firestore dbFirestore = FirestoreClient.getFirestore();
        DocumentReference documentReference = dbFirestore.collection("Announcements")
                .document("Project").collection("Projects")
                .document(project.getAnnouncementId());
        ApiFuture<DocumentSnapshot> future = documentReference.get();
        DocumentSnapshot document = future.get();

        Project project1 = null;

        if(document.exists()) {
            project1 = document.toObject(Project.class);
            return project1;
        }
        else {
            return null;
        }
    }

    public String update(Project project) throws ExecutionException, InterruptedException {
        Firestore dbFirestore = FirestoreClient.getFirestore();
        ApiFuture<WriteResult> collectionsApiFuture = dbFirestore.collection("Announcements")
                .document("Project").collection("Projects")
                .document(project.getAnnouncementId()).set(project);
        return collectionsApiFuture.get().getUpdateTime().toString();
    }

    public String delete(Project project) {
        Firestore dbFirestore = FirestoreClient.getFirestore();
        ApiFuture<WriteResult> writeResult = dbFirestore.collection("Announcements")
                .document("Project").collection("Projects")
                .document(project.getAnnouncementId()).delete();
        return "Document with Project Id: "+ project.getAnnouncementId() +" has been deleted";
    }
}
