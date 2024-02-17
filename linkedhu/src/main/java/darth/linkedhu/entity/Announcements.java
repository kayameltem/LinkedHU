package darth.linkedhu.entity;

import com.google.gson.annotations.SerializedName;

import darth.linkedhu.enums.AnnouncementType;
import lombok.*;

import java.util.ArrayList;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Announcements {

    @SerializedName("announcementId")
    private String announcementId;

    @SerializedName("type")
    private AnnouncementType type;

    @SerializedName("title")
    private String title;

    @SerializedName("shortDescription")
    private String shortDescription;

    @SerializedName("longDescription")
    private String longDescription;

    @SerializedName("startDate")
    private String startDate;

    @SerializedName("endDate")
    private String endDate;

    @SerializedName("owner")
    private String owner;

    @SerializedName("ownerName")
    private String ownerName;

    @SerializedName("applicants")
    private ArrayList<String> applicants;
}
