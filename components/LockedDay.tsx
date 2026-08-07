import { BilingualText } from "@/components/BilingualText";
import { RELEASED_THROUGH_DAY } from "@/content/course";

export function LockedDay({ day }: { day: number }) {
  return (
    <main className="locked-day">
      <p className="locked-day-eyebrow">
        <BilingualText en={`Day ${day}`} ko={`${day}일차`} />
      </p>
      <h1 className="locked-day-title">
        <BilingualText en="Not open yet" ko="아직 열리지 않았습니다" />
      </h1>
      <p className="locked-day-body">
        <BilingualText
          en="This day opens when the class reaches it. Finish today first."
          ko="이 일차는 수업이 그날에 도달하면 열립니다. 오늘 것부터 끝내세요."
        />
      </p>
      <p className="locked-day-body">
        <BilingualText
          en={`Day ${RELEASED_THROUGH_DAY} is open now.`}
          ko={`지금은 ${RELEASED_THROUGH_DAY}일차까지 열려 있습니다.`}
        />
      </p>
      <a className="locked-day-link" href={`../${RELEASED_THROUGH_DAY}/`}>
        <BilingualText
          en={`Go to Day ${RELEASED_THROUGH_DAY}`}
          ko={`${RELEASED_THROUGH_DAY}일차로 가기`}
        />
      </a>
    </main>
  );
}
