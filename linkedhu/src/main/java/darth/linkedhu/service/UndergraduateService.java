package darth.linkedhu.service;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.*;
import com.google.firebase.cloud.FirestoreClient;
import darth.linkedhu.entity.Undergraduate;
import org.springframework.stereotype.Service;

import java.util.concurrent.ExecutionException;

@Service
public class UndergraduateService {

    public String save(Undergraduate undergraduate) throws InterruptedException, ExecutionException {
        Firestore dbFirestore = FirestoreClient.getFirestore();
        ApiFuture<WriteResult> collectionsApiFuture = dbFirestore.collection("Users")
               .document(undergraduate.getMail()).set(undergraduate);
        return collectionsApiFuture.get().getUpdateTime().toString();
    }

    public Undergraduate get(Undergraduate undergraduate) throws InterruptedException, ExecutionException {
        Firestore dbFirestore = FirestoreClient.getFirestore();
        DocumentReference documentReference = dbFirestore.collection("Users")
                .document(undergraduate.getMail());
        ApiFuture<DocumentSnapshot> future = documentReference.get();

        DocumentSnapshot document = future.get();

        Undergraduate undergraduate2 = null;

        if(document.exists()) {
            undergraduate2 = document.toObject(Undergraduate.class);
            return undergraduate2;
        }else {
            return null;
        }
    }

    public String update(Undergraduate undergraduate) throws InterruptedException, ExecutionException {
        Firestore dbFirestore = FirestoreClient.getFirestore();
        ApiFuture<WriteResult> collectionsApiFuture = dbFirestore.collection("Users")
                .document(undergraduate.getMail()).set(undergraduate);
        return collectionsApiFuture.get().getUpdateTime().toString();
    }

    public String delete(Undergraduate undergraduate) {
        Firestore dbFirestore = FirestoreClient.getFirestore();
        ApiFuture<WriteResult> writeResult = dbFirestore.collection("Users")
                .document(undergraduate.getMail()).delete();
        System.out.println(writeResult);
        return "Document with Undergraduate Mail: "+undergraduate.getMail()+" has been deleted";
    }

}
