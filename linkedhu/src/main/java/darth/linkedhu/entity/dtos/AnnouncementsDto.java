package darth.linkedhu.entity.dtos;

import com.google.gson.annotations.SerializedName;
import darth.linkedhu.entity.Announcements;
import darth.linkedhu.enums.AnnouncementType;
import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class AnnouncementsDto {

    @SerializedName("announcement")
    Announcements announcement;

    @SerializedName("type")
    AnnouncementType type;
}
