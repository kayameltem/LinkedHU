package darth.linkedhu.service;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.*;
import com.google.firebase.cloud.FirestoreClient;
import darth.linkedhu.entity.Graduate;
import org.springframework.stereotype.Service;

import java.util.concurrent.ExecutionException;

@Service
public class GraduateService {

    public String save(Graduate graduate) throws InterruptedException, ExecutionException {
        Firestore dbFirestore = FirestoreClient.getFirestore();
        ApiFuture<WriteResult> collectionsApiFuture = dbFirestore.collection("Users")
                .document(graduate.getMail()).set(graduate);


        return collectionsApiFuture.get().getUpdateTime().toString();
    }

    public Graduate get(Graduate graduate) throws InterruptedException, ExecutionException {
        Firestore dbFirestore = FirestoreClient.getFirestore();
        DocumentReference documentReference = dbFirestore.collection("Users")
                .document(graduate.getMail());
        ApiFuture<DocumentSnapshot> future = documentReference.get();

        DocumentSnapshot document = future.get();

        Graduate graduate2 = null;

        if(document.exists()) {
            graduate2 = document.toObject(Graduate.class);
            return graduate2;
        }else {
            return null;
        }
    }

    public String update(Graduate graduate) throws InterruptedException, ExecutionException {
        Firestore dbFirestore = FirestoreClient.getFirestore();
        ApiFuture<WriteResult> collectionsApiFuture = dbFirestore.collection("Users")
                .document(graduate.getMail()).set(graduate);
        return collectionsApiFuture.get().getUpdateTime().toString();
    }

    public String delete(Graduate graduate) {
        Firestore dbFirestore = FirestoreClient.getFirestore();
        ApiFuture<WriteResult> writeResult = dbFirestore.collection("Users")
                .document(graduate.getMail()).delete();
        System.out.println(writeResult);
        return "Document with Graduate MAil: "+graduate.getMail()+" has been deleted";
    }

}
