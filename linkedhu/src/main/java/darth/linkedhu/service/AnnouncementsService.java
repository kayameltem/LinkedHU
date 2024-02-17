package darth.linkedhu.service;

import com.google.api.core.ApiFuture;
import com.google.auth.Credentials;
import com.google.auth.oauth2.GoogleCredentials;
import com.google.cloud.firestore.*;
import com.google.cloud.storage.*;
import com.google.cloud.storage.Blob;
import com.google.firebase.cloud.FirestoreClient;
import darth.linkedhu.UserExcelExporter;
import darth.linkedhu.entity.*;
import darth.linkedhu.entity.dtos.AnnouncementsDto;
import darth.linkedhu.enums.AnnouncementType;
import darth.linkedhu.enums.UserType;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;


import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.*;
import java.util.concurrent.ExecutionException;

import static darth.linkedhu.enums.AnnouncementType.*;
import static java.util.Comparator.comparing;
import static java.util.stream.Collectors.collectingAndThen;
import static java.util.stream.Collectors.toCollection;

@Service
public class AnnouncementsService {

    private final String DOWNLOAD_URL = "https://firebasestorage.googleapis.com/v0/b/linked-huceng.appspot.com/o/%s?alt=media";
    private String TEMP_URL;

    public ArrayList<Announcements> getAllDocuments(AnnouncementType type) throws ExecutionException, InterruptedException {
        Firestore db = FirestoreClient.getFirestore();
        ApiFuture<QuerySnapshot> future = null;

        if (type.equals(AnnouncementType.JOB)) {
            future = db.collection("Announcements").document("Job")
                    .collection("Jobs").get();
        }
        else if (type.equals(AnnouncementType.INTERNSHIP)) {
            future = db.collection("Announcements").document("Internship")
                    .collection("Internships").get();
        }
        else if (type.equals(AnnouncementType.SCHOLARSHIP)) {
            future = db.collection("Announcements").document("Scholarship")
                    .collection("Scholarships").get();
        }
        else if (type.equals(AnnouncementType.PROJECT)) {
            future = db.collection("Announcements").document("Project")
                    .collection("Projects").get();
        }

        List<QueryDocumentSnapshot> documents = future.get().getDocuments();
        ArrayList<Announcements> list = new ArrayList<>();
        for (QueryDocumentSnapshot document : documents) {
            list.add(document.toObject(Announcements.class));
        }
        list = list.stream().collect(collectingAndThen(toCollection(() -> new TreeSet<Announcements>(comparing(Announcements::getAnnouncementId))),ArrayList::new));
        return list;
    }

    public boolean applyAnnouncement(Application application) throws ExecutionException, InterruptedException {
        Announcements announcement = findAnnouncementById(application.getAnnouncementId());
        AnnouncementType type = announcement.getType();

        UserService userService = new UserService();
        User user = userService.findUserByMail(application.getMail());
        UserType userType = user.getType();

        if (announcement.getApplicants() == null) {
            announcement.setApplicants(new ArrayList<>());
        }
        for (String mail : announcement.getApplicants()) {
            if (user.getMail().equals(mail)) {
                return false;
            }
        }
        announcement.getApplicants().add(application.getMail());

        if (user.getAppliedAnnouncements() == null) {
            user.setAppliedAnnouncements(new ArrayList<>());
        }
        for (String id : user.getAppliedAnnouncements()) {
            if (announcement.getAnnouncementId().equals(id)) {
                return false;
            }
        }
        user.getAppliedAnnouncements().add(announcement.getAnnouncementId());

        if (type.equals(INTERNSHIP)) {
            InternshipService internshipService = new InternshipService();
            internshipService.update((Internship) announcement);
        }
        else if (type.equals(JOB)) {
            JobService jobService = new JobService();
            jobService.update((Job) announcement);
        }
        else if (type.equals(PROJECT)) {
            ProjectService projectService = new ProjectService();
            projectService.update((Project) announcement);
        }
        else if (type.equals(SCHOLARSHIP)) {
            ScholarshipService scholarshipService = new ScholarshipService();
            scholarshipService.update((Scholarship) announcement);
        }

        if (userType.equals(UserType.ACADEMICIAN)) {
            AcademicianService academicianService = new AcademicianService();
            academicianService.update((Academician) user);
        }
        else if (userType.equals(UserType.UNDERGRADUATE)) {
            UndergraduateService undergraduateService = new UndergraduateService();
            undergraduateService.update((Undergraduate) user);
        }
        else if (userType.equals(UserType.GRADUATE)) {
            GraduateService graduateService = new GraduateService();
            graduateService.update((Graduate) user);
        }

        return true;
    }


    private String uploadFile(File file, String fileName) throws IOException {
        BlobId blobId = BlobId.of("linked-huceng.appspot.com", fileName);
        BlobInfo blobInfo = BlobInfo.newBuilder(blobId).setContentType("media").build();
        Credentials credentials = GoogleCredentials.fromStream(new FileInputStream(".\\bbm384-2022-demo-final-darth-ceng\\linkedhu\\src\\main\\resources\\serviceAccountKey.json"));
        Storage storage = StorageOptions.newBuilder().setCredentials(credentials).build().getService();
        storage.create(blobInfo, Files.readAllBytes(file.toPath()));
        return String.format(DOWNLOAD_URL, URLEncoder.encode(fileName, StandardCharsets.UTF_8));
    }

    private File convertToFile(MultipartFile multipartFile, String fileName) throws IOException {
        File tempFile = new File(fileName);
        try (FileOutputStream fos = new FileOutputStream(tempFile)) {
            fos.write(multipartFile.getBytes());
            fos.close();
        }
        return tempFile;
    }

    private String getExtension(String fileName) {
        return fileName.substring(fileName.lastIndexOf("."));
    }


    public boolean upload(MultipartFile multipartFile) {

        try {
            String fileName = multipartFile.getOriginalFilename();
            fileName = UUID.randomUUID().toString().concat(this.getExtension(fileName));

            File file = this.convertToFile(multipartFile, fileName);
            TEMP_URL = this.uploadFile(file, fileName);
            file.delete();
            return true;
        }
        catch (Exception e) {
            e.printStackTrace();
            return false;
        }

    }

    public boolean download(String fileName) throws IOException {
        String destFileName = UUID.randomUUID().toString().concat(this.getExtension(fileName));
        String destFilePath = "C:\\Users\\Beyza\\Desktop\\destination\\" + destFileName;

        Credentials credentials = GoogleCredentials.fromStream(new FileInputStream(".\\bbm384-2022-demo-final-darth-ceng\\linkedhu\\src\\main\\resources\\serviceAccountKey.json"));
        Storage storage = StorageOptions.newBuilder().setCredentials(credentials).build().getService();
        Blob blob = storage.get(BlobId.of("linked-huceng.appspot.com", fileName));
        blob.downloadTo(Paths.get(destFilePath));
        return true;
    }

    public Announcements findAnnouncementById(String id) throws ExecutionException, InterruptedException {

        Firestore dbFirestore = FirestoreClient.getFirestore();

        DocumentReference jobDocumentSnapshot = dbFirestore.collection("Announcements")
                .document("Job").collection("Jobs").document(id);
        ApiFuture<DocumentSnapshot> future = jobDocumentSnapshot.get();
        DocumentSnapshot document = future.get();
        Job job = null;

        if (document.exists()) {
            job = document.toObject(Job.class);
        }

        DocumentReference internshipDocumentSnapshot = dbFirestore.collection("Announcements")
                .document("Internship").collection("Internships").document(id);
        ApiFuture<DocumentSnapshot> future2 = internshipDocumentSnapshot.get();
        DocumentSnapshot document2 = future2.get();
        Internship internship = null;

        if (document2.exists())
        {
            internship = document2.toObject(Internship.class);
        }

        DocumentReference projectDocumentSnapshot = dbFirestore.collection("Announcements")
                .document("Project").collection("Projects").document(id);
        ApiFuture<DocumentSnapshot> future3 = projectDocumentSnapshot.get();
        DocumentSnapshot document3 = future3.get();
        Project project = null;

        if (document3.exists()) {
            project = document3.toObject(Project.class);
        }

        DocumentReference scholarshipDocumentSnapshot = dbFirestore.collection("Announcements")
                .document("Scholarship").collection("Scholarships").document(id);
        ApiFuture<DocumentSnapshot> future4 = scholarshipDocumentSnapshot.get();
        DocumentSnapshot document4 = future4.get();
        Scholarship scholarship = null;

        if (document4.exists()) {
            scholarship = document4.toObject(Scholarship.class);
        }

        Announcements announcements;
        if (Objects.nonNull(job)) {
            announcements = job;
            announcements.setType(JOB);
        }
        else if (Objects.nonNull(internship)) {
            announcements = internship;
            announcements.setType(INTERNSHIP);
        }
        else if (Objects.nonNull(scholarship)) {
            announcements = scholarship;
            announcements.setType(SCHOLARSHIP);
        }
        else if (Objects.nonNull(project)) {
            announcements = project;
            announcements.setType(PROJECT);
        }
        else {
            System.out.println("Announcement not found");
            return null;
        }
        return announcements;
    }

    public ArrayList<User> showApplicants(AnnouncementsDto announcementsDto) throws ExecutionException, InterruptedException, IOException {
        Announcements announcements = announcementsDto.getAnnouncement();
        Announcements announcements1 = findAnnouncementById(announcements.getAnnouncementId());
        ArrayList<User> users = new ArrayList<>();
        UserService userService = new UserService();
        for (String mail : announcements1.getApplicants()) {
            User user = userService.findUserByMail(mail);
            users.add(user);
        }

        UserExcelExporter excelExporter = new UserExcelExporter(users);
        excelExporter.export("applicants");
        return users;
    }
}
