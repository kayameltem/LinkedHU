package darth.linkedhu.service;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.*;
import com.google.firebase.cloud.FirestoreClient;
import darth.linkedhu.entity.Academician;
import org.springframework.stereotype.Service;

import java.util.concurrent.ExecutionException;

@Service
public class AcademicianService {

    public String save( Academician academician) throws InterruptedException, ExecutionException {
        Firestore dbFirestore = FirestoreClient.getFirestore();
        ApiFuture<WriteResult> collectionsApiFuture = dbFirestore.collection("Users").document(academician.getMail()).set(academician);
        return collectionsApiFuture.get().getUpdateTime().toString();
    }

    public Academician get(Academician academician) throws InterruptedException, ExecutionException {
        Firestore dbFirestore = FirestoreClient.getFirestore();
        DocumentReference documentReference = dbFirestore.collection("Users")
                .document(academician.getMail());
        ApiFuture<DocumentSnapshot> future = documentReference.get();

        DocumentSnapshot document = future.get();

        Academician academician2 = null;

        if(document.exists()) {
            academician2 = document.toObject(Academician.class);
            return academician2;
        }else {
            return null;
        }
    }

    public String update(Academician academician) throws InterruptedException, ExecutionException {
        Firestore dbFirestore = FirestoreClient.getFirestore();
        ApiFuture<WriteResult> collectionsApiFuture = dbFirestore.collection("Users")
                .document(academician.getMail()).set(academician);
        return collectionsApiFuture.get().getUpdateTime().toString();
    }

    public String delete(Academician academician) {
        Firestore dbFirestore = FirestoreClient.getFirestore();
        ApiFuture<WriteResult> writeResult = dbFirestore.collection("Users")
                .document(academician.getMail()).delete();
        System.out.println(writeResult);
        return "Document with Academician Mail: "+academician.getMail()+" has been deleted";
    }


}
