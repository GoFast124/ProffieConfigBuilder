import type { BladeStyleConfig } from '../../types/config';

export interface PresetTemplate {
  id: string;
  name: string;
  description: string;
  category: 'fett263' | 'classic' | 'simple';
  folderSuggestion: string;
  trackSuggestion: string;
  previewColor: string;   // hex, for the dot
  bladeStyle: BladeStyleConfig;
}

// Base for all styles that use a raw StylePtr string
function raw(rawStyle: string, baseColor: string, overrides: Partial<BladeStyleConfig> = {}): BladeStyleConfig {
  return {
    baseColor,
    effect: 'none',
    gradient: false,
    gradientColor: '#ffffff',
    clashColor: '#ffffff',
    clashEffect: 'color_change',
    swingColorShift: false,
    brightness: 100,
    rawStyle,
    ...overrides,
  };
}

// ── Fett263 ProffieOS8 presets (from David_Saber2.h) ─────────────────────────

const NINTH_JEDI_STYLE = `StylePtr<Layers<Black, ColorSelect<IncrementWithReset<ThresholdPulseF<Scale<IsGreaterThan<IncrementWithReset<ThresholdPulseF<Sum<EffectPulseF<EFFECT_CLASH>, EffectPulseF<EFFECT_STAB>, EffectPulseF<EFFECT_LOCKUP_BEGIN>>, Int<32000>>, EffectPulseF<EFFECT_BOOT>, Int<10000>, Int<1000>>, Int<7900>>, Int<0>, IncrementWithReset<EffectPulseF<EFFECT_LOCKUP_BEGIN>, EffectPulseF<EFFECT_CLASH>, Int<33000>, Int<33000>>>>, EffectPulseF<EFFECT_BOOT>, Int<1>>, TrConcat<TrDelay<2000>, AlphaL<RgbArg<BASE_COLOR_ARG, Rgb<0, 255, 0>>, Int<0>>, TrSmoothFade<800>, RgbArg<BASE_COLOR_ARG, Rgb<0, 255, 0>>, TrSmoothFade<800>>, Mix<Int<3200>, Black, RandomFlicker<RgbArg<BASE_COLOR_ARG, Rgb<0, 255, 0>>, StripesX<Int<36000>, Int<-400>, RgbArg<BASE_COLOR_ARG, Rgb<0, 255, 0>>, Mix<Int<18000>, Black, RgbArg<BASE_COLOR_ARG, Rgb<0, 255, 0>>>, RgbArg<BASE_COLOR_ARG, Rgb<0, 255, 0>>, Mix<Int<10000>, Black, RgbArg<BASE_COLOR_ARG, Rgb<0, 255, 0>>>>>>, RandomFlicker<RgbArg<BASE_COLOR_ARG, Rgb<0, 255, 0>>, StripesX<Int<36000>, Int<-1200>, RgbArg<BASE_COLOR_ARG, Rgb<0, 255, 0>>, Mix<Int<18000>, Black, RgbArg<BASE_COLOR_ARG, Rgb<0, 255, 0>>>, RgbArg<BASE_COLOR_ARG, Rgb<0, 255, 0>>, Mix<Int<10000>, Black, RgbArg<BASE_COLOR_ARG, Rgb<0, 255, 0>>>>>>, TransitionEffectL<TrWaveX<RgbArg<BLAST_COLOR_ARG, Rgb<255, 255, 255>>, Scale<EffectRandomF<EFFECT_BLAST>, Int<100>, Int<400>>, Int<100>, Scale<EffectPosition<EFFECT_BLAST>, Int<100>, Int<400>>, Scale<EffectPosition<EFFECT_BLAST>, Int<28000>, Int<8000>>>, EFFECT_BLAST>, Mix<IsLessThan<ClashImpactF<>, Int<26000>>, TransitionEffectL<TrConcat<TrInstant, AlphaL<RgbArg<CLASH_COLOR_ARG, Rgb<255, 255, 255>>, Bump<Scale<BladeAngle<>, Scale<BladeAngle<0, 16000>, Sum<IntArg<LOCKUP_POSITION_ARG, 16000>, Int<-12000>>, Sum<IntArg<LOCKUP_POSITION_ARG, 16000>, Int<10000>>>, Sum<IntArg<LOCKUP_POSITION_ARG, 16000>, Int<-10000>>>, Scale<ClashImpactF<>, Int<12000>, Int<60000>>>>, TrFadeX<Scale<ClashImpactF<>, Int<200>, Int<400>>>>, EFFECT_CLASH>, TransitionEffectL<TrWaveX<RgbArg<CLASH_COLOR_ARG, Rgb<255, 255, 255>>, Scale<ClashImpactF<>, Int<100>, Int<400>>, Int<100>, Scale<ClashImpactF<>, Int<100>, Int<400>>, Scale<BladeAngle<>, Scale<BladeAngle<0, 16000>, Sum<IntArg<LOCKUP_POSITION_ARG, 16000>, Int<-12000>>, Sum<IntArg<LOCKUP_POSITION_ARG, 16000>, Int<10000>>>, Sum<IntArg<LOCKUP_POSITION_ARG, 16000>, Int<-10000>>>>, EFFECT_CLASH>>, LockupTrL<TransitionEffect<AlphaL<AlphaMixL<Bump<Scale<BladeAngle<>, Scale<BladeAngle<0, 16000>, Sum<IntArg<LOCKUP_POSITION_ARG, 16000>, Int<-12000>>, Sum<IntArg<LOCKUP_POSITION_ARG, 16000>, Int<10000>>>, Sum<IntArg<LOCKUP_POSITION_ARG, 16000>, Int<-10000>>>, Scale<SwingSpeed<100>, Int<14000>, Int<22000>>>, AudioFlicker<RgbArg<LOCKUP_COLOR_ARG, Rgb<255, 255, 255>>, Mix<Int<12000>, Black, RgbArg<LOCKUP_COLOR_ARG, Rgb<255, 255, 255>>>>, BrownNoiseFlicker<RgbArg<LOCKUP_COLOR_ARG, Rgb<255, 255, 255>>, Mix<Int<12000>, Black, RgbArg<LOCKUP_COLOR_ARG, Rgb<255, 255, 255>>>, 300>>, Bump<Scale<BladeAngle<>, Scale<BladeAngle<0, 16000>, Sum<IntArg<LOCKUP_POSITION_ARG, 16000>, Int<-12000>>, Sum<IntArg<LOCKUP_POSITION_ARG, 16000>, Int<10000>>>, Sum<IntArg<LOCKUP_POSITION_ARG, 16000>, Int<-10000>>>, Scale<SwingSpeed<100>, Int<14000>, Int<22000>>>>, AlphaL<AudioFlicker<RgbArg<LOCKUP_COLOR_ARG, Rgb<255, 255, 255>>, Mix<Int<20000>, Black, RgbArg<LOCKUP_COLOR_ARG, Rgb<255, 255, 255>>>>, Bump<Scale<BladeAngle<>, Scale<BladeAngle<0, 16000>, Sum<IntArg<LOCKUP_POSITION_ARG, 16000>, Int<-12000>>, Sum<IntArg<LOCKUP_POSITION_ARG, 16000>, Int<10000>>>, Sum<IntArg<LOCKUP_POSITION_ARG, 16000>, Int<-10000>>>, Scale<SwingSpeed<100>, Int<14000>, Int<18000>>>>, TrExtend<5000, TrInstant>, TrFade<5000>, EFFECT_LOCKUP_BEGIN>, TrConcat<TrJoin<TrDelay<50>, TrInstant>, Mix<IsLessThan<ClashImpactF<>, Int<26000>>, RgbArg<LOCKUP_COLOR_ARG, Rgb<255, 255, 255>>, AlphaL<RgbArg<LOCKUP_COLOR_ARG, Rgb<255, 255, 255>>, Bump<Scale<BladeAngle<>, Scale<BladeAngle<0, 16000>, Sum<IntArg<LOCKUP_POSITION_ARG, 16000>, Int<-12000>>, Sum<IntArg<LOCKUP_POSITION_ARG, 16000>, Int<10000>>>, Sum<IntArg<LOCKUP_POSITION_ARG, 16000>, Int<-10000>>>, Scale<ClashImpactF<>, Int<20000>, Int<60000>>>>>, TrFade<300>>, TrConcat<TrInstant, RgbArg<LOCKUP_COLOR_ARG, Rgb<255, 255, 255>>, TrFade<400>>, SaberBase::LOCKUP_NORMAL, Int<1>>, ResponsiveLightningBlockL<Strobe<RgbArg<LB_COLOR_ARG, Rgb<255, 255, 255>>, AudioFlicker<RgbArg<LB_COLOR_ARG, Rgb<255, 255, 255>>, Blue>, 50, 1>, TrConcat<TrExtend<200, TrInstant>, AlphaL<RgbArg<LB_COLOR_ARG, Rgb<255, 255, 255>>, Bump<Scale<BladeAngle<>, Int<10000>, Int<21000>>, Int<10000>>>, TrFade<200>>, TrConcat<TrInstant, RgbArg<LB_COLOR_ARG, Rgb<255, 255, 255>>, TrFade<400>>, Int<1>>, LockupTrL<AlphaL<TransitionEffect<RandomPerLEDFlickerL<RgbArg<DRAG_COLOR_ARG, Rgb<255, 255, 255>>>, BrownNoiseFlickerL<RgbArg<DRAG_COLOR_ARG, Rgb<255, 255, 255>>, Int<300>>, TrExtend<4000, TrInstant>, TrFade<4000>, EFFECT_DRAG_BEGIN>, SmoothStep<Scale<TwistAngle<>, IntArg<DRAG_SIZE_ARG, 28000>, Int<30000>>, Int<3000>>>, TrWipeIn<200>, TrWipe<200>, SaberBase::LOCKUP_DRAG, Int<1>>, LockupTrL<AlphaL<Stripes<2000, 4000, Mix<TwistAngle<>, RgbArg<STAB_COLOR_ARG, Rgb<255, 68, 0>>, RotateColorsX<Int<3000>, RgbArg<STAB_COLOR_ARG, Rgb<255, 68, 0>>>>, Mix<Sin<Int<50>>, Black, Mix<TwistAngle<>, RgbArg<STAB_COLOR_ARG, Rgb<255, 68, 0>>, RotateColorsX<Int<3000>, RgbArg<STAB_COLOR_ARG, Rgb<255, 68, 0>>>>>, Mix<Int<4096>, Black, Mix<TwistAngle<>, RgbArg<STAB_COLOR_ARG, Rgb<255, 68, 0>>, RotateColorsX<Int<3000>, RgbArg<STAB_COLOR_ARG, Rgb<255, 68, 0>>>>>>, SmoothStep<Scale<TwistAngle<>, IntArg<MELT_SIZE_ARG, 28000>, Int<30000>>, Int<3000>>>, TrConcat<TrExtend<4000, TrWipeIn<200>>, AlphaL<HumpFlicker<Mix<TwistAngle<>, RgbArg<STAB_COLOR_ARG, Rgb<255, 68, 0>>, RotateColorsX<Int<3000>, RgbArg<STAB_COLOR_ARG, Rgb<255, 68, 0>>>>, RotateColorsX<Int<3000>, Mix<TwistAngle<>, RgbArg<STAB_COLOR_ARG, Rgb<255, 68, 0>>, RotateColorsX<Int<3000>, RgbArg<STAB_COLOR_ARG, Rgb<255, 68, 0>>>>>, 100>, SmoothStep<Scale<TwistAngle<>, IntArg<MELT_SIZE_ARG, 28000>, Int<30000>>, Int<3000>>>, TrFade<4000>>, TrWipe<200>, SaberBase::LOCKUP_MELT, Int<1>>, InOutTrL<TrWipeX<BendTimePowInvX<IgnitionTime<300>, Mult<IntArg<IGNITION_OPTION2_ARG, 10992>, Int<98304>>>>, TrWipeInX<BendTimePowX<RetractionTime<0>, Mult<IntArg<RETRACTION_OPTION2_ARG, 10992>, Int<98304>>>>, Black>>>()`;

const FALLEN_STYLE = `StylePtr<Layers<Stripes<16000, -1000, RgbArg<BASE_COLOR_ARG, Rgb<0, 0, 255>>, Pulsing<Mix<Int<11565>, Black, RgbArg<BASE_COLOR_ARG, Rgb<0, 0, 255>>>, RgbArg<BASE_COLOR_ARG, Rgb<0, 0, 255>>, 800>, RgbArg<BASE_COLOR_ARG, Rgb<0, 0, 255>>>, TransitionEffectL<TrWaveX<RgbArg<BLAST_COLOR_ARG, Rgb<255, 255, 255>>, Scale<EffectRandomF<EFFECT_BLAST>, Int<100>, Int<400>>, Int<100>, Scale<EffectPosition<EFFECT_BLAST>, Int<100>, Int<400>>, Scale<EffectPosition<EFFECT_BLAST>, Int<28000>, Int<8000>>>, EFFECT_BLAST>, Mix<IsLessThan<ClashImpactF<>, Int<26000>>, TransitionEffectL<TrConcat<TrInstant, AlphaL<RgbArg<CLASH_COLOR_ARG, Rgb<255, 255, 255>>, Bump<Scale<BladeAngle<>, Scale<BladeAngle<0, 16000>, Sum<IntArg<LOCKUP_POSITION_ARG, 16000>, Int<-12000>>, Sum<IntArg<LOCKUP_POSITION_ARG, 16000>, Int<10000>>>, Sum<IntArg<LOCKUP_POSITION_ARG, 16000>, Int<-10000>>>, Scale<ClashImpactF<>, Int<12000>, Int<60000>>>>, TrFadeX<Scale<ClashImpactF<>, Int<200>, Int<400>>>>, EFFECT_CLASH>, TransitionEffectL<TrWaveX<RgbArg<CLASH_COLOR_ARG, Rgb<255, 255, 255>>, Scale<ClashImpactF<>, Int<100>, Int<400>>, Int<100>, Scale<ClashImpactF<>, Int<100>, Int<400>>, Scale<BladeAngle<>, Scale<BladeAngle<0, 16000>, Sum<IntArg<LOCKUP_POSITION_ARG, 16000>, Int<-12000>>, Sum<IntArg<LOCKUP_POSITION_ARG, 16000>, Int<10000>>>, Sum<IntArg<LOCKUP_POSITION_ARG, 16000>, Int<-10000>>>>, EFFECT_CLASH>>, LockupTrL<TransitionEffect<AlphaL<AlphaMixL<Bump<Scale<BladeAngle<>, Scale<BladeAngle<0, 16000>, Sum<IntArg<LOCKUP_POSITION_ARG, 16000>, Int<-12000>>, Sum<IntArg<LOCKUP_POSITION_ARG, 16000>, Int<10000>>>, Sum<IntArg<LOCKUP_POSITION_ARG, 16000>, Int<-10000>>>, Scale<SwingSpeed<100>, Int<14000>, Int<22000>>>, AudioFlicker<RgbArg<LOCKUP_COLOR_ARG, Rgb<255, 255, 255>>, Mix<Int<12000>, Black, RgbArg<LOCKUP_COLOR_ARG, Rgb<255, 255, 255>>>>, BrownNoiseFlicker<RgbArg<LOCKUP_COLOR_ARG, Rgb<255, 255, 255>>, Mix<Int<12000>, Black, RgbArg<LOCKUP_COLOR_ARG, Rgb<255, 255, 255>>>, 300>>, Bump<Scale<BladeAngle<>, Scale<BladeAngle<0, 16000>, Sum<IntArg<LOCKUP_POSITION_ARG, 16000>, Int<-12000>>, Sum<IntArg<LOCKUP_POSITION_ARG, 16000>, Int<10000>>>, Sum<IntArg<LOCKUP_POSITION_ARG, 16000>, Int<-10000>>>, Scale<SwingSpeed<100>, Int<14000>, Int<22000>>>>, AlphaL<AudioFlicker<RgbArg<LOCKUP_COLOR_ARG, Rgb<255, 255, 255>>, Mix<Int<20000>, Black, RgbArg<LOCKUP_COLOR_ARG, Rgb<255, 255, 255>>>>, Bump<Scale<BladeAngle<>, Scale<BladeAngle<0, 16000>, Sum<IntArg<LOCKUP_POSITION_ARG, 16000>, Int<-12000>>, Sum<IntArg<LOCKUP_POSITION_ARG, 16000>, Int<10000>>>, Sum<IntArg<LOCKUP_POSITION_ARG, 16000>, Int<-10000>>>, Scale<SwingSpeed<100>, Int<14000>, Int<18000>>>>, TrExtend<5000, TrInstant>, TrFade<5000>, EFFECT_LOCKUP_BEGIN>, TrConcat<TrJoin<TrDelay<50>, TrInstant>, Mix<IsLessThan<ClashImpactF<>, Int<26000>>, RgbArg<LOCKUP_COLOR_ARG, Rgb<255, 255, 255>>, AlphaL<RgbArg<LOCKUP_COLOR_ARG, Rgb<255, 255, 255>>, Bump<Scale<BladeAngle<>, Scale<BladeAngle<0, 16000>, Sum<IntArg<LOCKUP_POSITION_ARG, 16000>, Int<-12000>>, Sum<IntArg<LOCKUP_POSITION_ARG, 16000>, Int<10000>>>, Sum<IntArg<LOCKUP_POSITION_ARG, 16000>, Int<-10000>>>, Scale<ClashImpactF<>, Int<20000>, Int<60000>>>>>, TrFade<300>>, TrConcat<TrInstant, RgbArg<LOCKUP_COLOR_ARG, Rgb<255, 255, 255>>, TrFade<400>>, SaberBase::LOCKUP_NORMAL, Int<1>>, ResponsiveLightningBlockL<Strobe<RgbArg<LB_COLOR_ARG, Rgb<255, 255, 255>>, AudioFlicker<RgbArg<LB_COLOR_ARG, Rgb<255, 255, 255>>, Blue>, 50, 1>, TrConcat<TrExtend<200, TrInstant>, AlphaL<RgbArg<LB_COLOR_ARG, Rgb<255, 255, 255>>, Bump<Scale<BladeAngle<>, Int<10000>, Int<21000>>, Int<10000>>>, TrFade<200>>, TrConcat<TrInstant, RgbArg<LB_COLOR_ARG, Rgb<255, 255, 255>>, TrFade<400>>, Int<1>>, LockupTrL<AlphaL<TransitionEffect<RandomPerLEDFlickerL<RgbArg<DRAG_COLOR_ARG, Rgb<255, 255, 255>>>, BrownNoiseFlickerL<RgbArg<DRAG_COLOR_ARG, Rgb<255, 255, 255>>, Int<300>>, TrExtend<4000, TrInstant>, TrFade<4000>, EFFECT_DRAG_BEGIN>, SmoothStep<Scale<TwistAngle<>, IntArg<DRAG_SIZE_ARG, 28000>, Int<30000>>, Int<3000>>>, TrWipeIn<200>, TrWipe<200>, SaberBase::LOCKUP_DRAG, Int<1>>, LockupTrL<AlphaL<Stripes<2000, 4000, Mix<TwistAngle<>, RgbArg<STAB_COLOR_ARG, Rgb<255, 68, 0>>, RotateColorsX<Int<3000>, RgbArg<STAB_COLOR_ARG, Rgb<255, 68, 0>>>>, Mix<Sin<Int<50>>, Black, Mix<TwistAngle<>, RgbArg<STAB_COLOR_ARG, Rgb<255, 68, 0>>, RotateColorsX<Int<3000>, RgbArg<STAB_COLOR_ARG, Rgb<255, 68, 0>>>>>, Mix<Int<4096>, Black, Mix<TwistAngle<>, RgbArg<STAB_COLOR_ARG, Rgb<255, 68, 0>>, RotateColorsX<Int<3000>, RgbArg<STAB_COLOR_ARG, Rgb<255, 68, 0>>>>>>, SmoothStep<Scale<TwistAngle<>, IntArg<MELT_SIZE_ARG, 28000>, Int<30000>>, Int<3000>>>, TrConcat<TrExtend<4000, TrWipeIn<200>>, AlphaL<HumpFlicker<Mix<TwistAngle<>, RgbArg<STAB_COLOR_ARG, Rgb<255, 68, 0>>, RotateColorsX<Int<3000>, RgbArg<STAB_COLOR_ARG, Rgb<255, 68, 0>>>>, RotateColorsX<Int<3000>, Mix<TwistAngle<>, RgbArg<STAB_COLOR_ARG, Rgb<255, 68, 0>>, RotateColorsX<Int<3000>, RgbArg<STAB_COLOR_ARG, Rgb<255, 68, 0>>>>>, 100>, SmoothStep<Scale<TwistAngle<>, IntArg<MELT_SIZE_ARG, 28000>, Int<30000>>, Int<3000>>>, TrFade<4000>>, TrWipe<200>, SaberBase::LOCKUP_MELT, Int<1>>, InOutTrL<TrWipeX<BendTimePowInvX<IgnitionTime<300>, Mult<IntArg<IGNITION_OPTION2_ARG, 10992>, Int<98304>>>>, TrWipeInX<BendTimePowX<RetractionTime<0>, Mult<IntArg<RETRACTION_OPTION2_ARG, 10992>, Int<98304>>>>, Black>>>()`;

const STATIC_STYLE = `StylePtr<Layers<RgbArg<BASE_COLOR_ARG, Rgb<0, 0, 255>>, TransitionEffectL<TrWaveX<RgbArg<BLAST_COLOR_ARG, Rgb<255, 255, 255>>, Scale<EffectRandomF<EFFECT_BLAST>, Int<100>, Int<400>>, Int<100>, Scale<EffectPosition<EFFECT_BLAST>, Int<100>, Int<400>>, Scale<EffectPosition<EFFECT_BLAST>, Int<28000>, Int<8000>>>, EFFECT_BLAST>, Mix<IsLessThan<ClashImpactF<>, Int<26000>>, TransitionEffectL<TrConcat<TrInstant, AlphaL<RgbArg<CLASH_COLOR_ARG, Rgb<255, 255, 255>>, Bump<Scale<BladeAngle<>, Scale<BladeAngle<0, 16000>, Sum<IntArg<LOCKUP_POSITION_ARG, 16000>, Int<-12000>>, Sum<IntArg<LOCKUP_POSITION_ARG, 16000>, Int<10000>>>, Sum<IntArg<LOCKUP_POSITION_ARG, 16000>, Int<-10000>>>, Scale<ClashImpactF<>, Int<12000>, Int<60000>>>>, TrFadeX<Scale<ClashImpactF<>, Int<200>, Int<400>>>>, EFFECT_CLASH>, TransitionEffectL<TrWaveX<RgbArg<CLASH_COLOR_ARG, Rgb<255, 255, 255>>, Scale<ClashImpactF<>, Int<100>, Int<400>>, Int<100>, Scale<ClashImpactF<>, Int<100>, Int<400>>, Scale<BladeAngle<>, Scale<BladeAngle<0, 16000>, Sum<IntArg<LOCKUP_POSITION_ARG, 16000>, Int<-12000>>, Sum<IntArg<LOCKUP_POSITION_ARG, 16000>, Int<10000>>>, Sum<IntArg<LOCKUP_POSITION_ARG, 16000>, Int<-10000>>>>, EFFECT_CLASH>>, LockupTrL<TransitionEffect<AlphaL<AlphaMixL<Bump<Scale<BladeAngle<>, Scale<BladeAngle<0, 16000>, Sum<IntArg<LOCKUP_POSITION_ARG, 16000>, Int<-12000>>, Sum<IntArg<LOCKUP_POSITION_ARG, 16000>, Int<10000>>>, Sum<IntArg<LOCKUP_POSITION_ARG, 16000>, Int<-10000>>>, Scale<SwingSpeed<100>, Int<14000>, Int<22000>>>, AudioFlicker<RgbArg<LOCKUP_COLOR_ARG, Rgb<255, 255, 255>>, Mix<Int<12000>, Black, RgbArg<LOCKUP_COLOR_ARG, Rgb<255, 255, 255>>>>, BrownNoiseFlicker<RgbArg<LOCKUP_COLOR_ARG, Rgb<255, 255, 255>>, Mix<Int<12000>, Black, RgbArg<LOCKUP_COLOR_ARG, Rgb<255, 255, 255>>>, 300>>, Bump<Scale<BladeAngle<>, Scale<BladeAngle<0, 16000>, Sum<IntArg<LOCKUP_POSITION_ARG, 16000>, Int<-12000>>, Sum<IntArg<LOCKUP_POSITION_ARG, 16000>, Int<10000>>>, Sum<IntArg<LOCKUP_POSITION_ARG, 16000>, Int<-10000>>>, Scale<SwingSpeed<100>, Int<14000>, Int<22000>>>>, AlphaL<AudioFlicker<RgbArg<LOCKUP_COLOR_ARG, Rgb<255, 255, 255>>, Mix<Int<20000>, Black, RgbArg<LOCKUP_COLOR_ARG, Rgb<255, 255, 255>>>>, Bump<Scale<BladeAngle<>, Scale<BladeAngle<0, 16000>, Sum<IntArg<LOCKUP_POSITION_ARG, 16000>, Int<-12000>>, Sum<IntArg<LOCKUP_POSITION_ARG, 16000>, Int<10000>>>, Sum<IntArg<LOCKUP_POSITION_ARG, 16000>, Int<-10000>>>, Scale<SwingSpeed<100>, Int<14000>, Int<18000>>>>, TrExtend<5000, TrInstant>, TrFade<5000>, EFFECT_LOCKUP_BEGIN>, TrConcat<TrJoin<TrDelay<50>, TrInstant>, Mix<IsLessThan<ClashImpactF<>, Int<26000>>, RgbArg<LOCKUP_COLOR_ARG, Rgb<255, 255, 255>>, AlphaL<RgbArg<LOCKUP_COLOR_ARG, Rgb<255, 255, 255>>, Bump<Scale<BladeAngle<>, Scale<BladeAngle<0, 16000>, Sum<IntArg<LOCKUP_POSITION_ARG, 16000>, Int<-12000>>, Sum<IntArg<LOCKUP_POSITION_ARG, 16000>, Int<10000>>>, Sum<IntArg<LOCKUP_POSITION_ARG, 16000>, Int<-10000>>>, Scale<ClashImpactF<>, Int<20000>, Int<60000>>>>>, TrFade<300>>, TrConcat<TrInstant, RgbArg<LOCKUP_COLOR_ARG, Rgb<255, 255, 255>>, TrFade<400>>, SaberBase::LOCKUP_NORMAL, Int<1>>, ResponsiveLightningBlockL<Strobe<RgbArg<LB_COLOR_ARG, Rgb<255, 255, 255>>, AudioFlicker<RgbArg<LB_COLOR_ARG, Rgb<255, 255, 255>>, Blue>, 50, 1>, TrConcat<TrExtend<200, TrInstant>, AlphaL<RgbArg<LB_COLOR_ARG, Rgb<255, 255, 255>>, Bump<Scale<BladeAngle<>, Int<10000>, Int<21000>>, Int<10000>>>, TrFade<200>>, TrConcat<TrInstant, RgbArg<LB_COLOR_ARG, Rgb<255, 255, 255>>, TrFade<400>>, Int<1>>, LockupTrL<AlphaL<TransitionEffect<RandomPerLEDFlickerL<RgbArg<DRAG_COLOR_ARG, Rgb<255, 255, 255>>>, BrownNoiseFlickerL<RgbArg<DRAG_COLOR_ARG, Rgb<255, 255, 255>>, Int<300>>, TrExtend<4000, TrInstant>, TrFade<4000>, EFFECT_DRAG_BEGIN>, SmoothStep<Scale<TwistAngle<>, IntArg<DRAG_SIZE_ARG, 28000>, Int<30000>>, Int<3000>>>, TrWipeIn<200>, TrWipe<200>, SaberBase::LOCKUP_DRAG, Int<1>>, LockupTrL<AlphaL<Stripes<2000, 4000, Mix<TwistAngle<>, RgbArg<STAB_COLOR_ARG, Rgb<255, 68, 0>>, RotateColorsX<Int<3000>, RgbArg<STAB_COLOR_ARG, Rgb<255, 68, 0>>>>, Mix<Sin<Int<50>>, Black, Mix<TwistAngle<>, RgbArg<STAB_COLOR_ARG, Rgb<255, 68, 0>>, RotateColorsX<Int<3000>, RgbArg<STAB_COLOR_ARG, Rgb<255, 68, 0>>>>>, Mix<Int<4096>, Black, Mix<TwistAngle<>, RgbArg<STAB_COLOR_ARG, Rgb<255, 68, 0>>, RotateColorsX<Int<3000>, RgbArg<STAB_COLOR_ARG, Rgb<255, 68, 0>>>>>>, SmoothStep<Scale<TwistAngle<>, IntArg<MELT_SIZE_ARG, 28000>, Int<30000>>, Int<3000>>>, TrConcat<TrExtend<4000, TrWipeIn<200>>, AlphaL<HumpFlicker<Mix<TwistAngle<>, RgbArg<STAB_COLOR_ARG, Rgb<255, 68, 0>>, RotateColorsX<Int<3000>, RgbArg<STAB_COLOR_ARG, Rgb<255, 68, 0>>>>, RotateColorsX<Int<3000>, Mix<TwistAngle<>, RgbArg<STAB_COLOR_ARG, Rgb<255, 68, 0>>, RotateColorsX<Int<3000>, RgbArg<STAB_COLOR_ARG, Rgb<255, 68, 0>>>>>, 100>, SmoothStep<Scale<TwistAngle<>, IntArg<MELT_SIZE_ARG, 28000>, Int<30000>>, Int<3000>>>, TrFade<4000>>, TrWipe<200>, SaberBase::LOCKUP_MELT, Int<1>>, InOutTrL<TrWipeX<BendTimePowInvX<IgnitionTime<300>, Mult<IntArg<IGNITION_OPTION2_ARG, 10992>, Int<98304>>>>, TrWipeInX<BendTimePowX<RetractionTime<0>, Mult<IntArg<RETRACTION_OPTION2_ARG, 10992>, Int<98304>>>>, Black>>>()`;

const KYLO_REN_STYLE = `StylePtr<Layers<ColorSelect<IntArg<STYLE_OPTION_ARG, 0>, TrInstant, StaticFire<BrownNoiseFlicker<RgbArg<BASE_COLOR_ARG, Rgb<0, 0, 255>>, RandomPerLEDFlicker<Mix<Int<3213>, Black, RgbArg<BASE_COLOR_ARG, Rgb<0, 0, 255>>>, Mix<Int<7710>, Black, RgbArg<BASE_COLOR_ARG, Rgb<0, 0, 255>>>>, 300>, Mix<Int<10280>, Black, RgbArg<BASE_COLOR_ARG, Rgb<0, 0, 255>>>, 0, 6, 10, 1000, 2>, StripesX<Int<1500>, Scale<SlowNoise<Int<2500>>, Int<-3000>, Int<-5000>>, RgbArg<BASE_COLOR_ARG, Rgb<0, 0, 255>>, Mix<Int<10280>, Black, RgbArg<BASE_COLOR_ARG, Rgb<0, 0, 255>>>, RgbArg<BASE_COLOR_ARG, Rgb<0, 0, 255>>, Mix<Int<2570>, Black, RgbArg<BASE_COLOR_ARG, Rgb<0, 0, 255>>>, RgbArg<BASE_COLOR_ARG, Rgb<0, 0, 255>>>>, TransitionEffectL<TrWaveX<RgbArg<BLAST_COLOR_ARG, Rgb<255, 255, 255>>, Scale<EffectRandomF<EFFECT_BLAST>, Int<100>, Int<400>>, Int<100>, Scale<EffectPosition<EFFECT_BLAST>, Int<100>, Int<400>>, Scale<EffectPosition<EFFECT_BLAST>, Int<28000>, Int<8000>>>, EFFECT_BLAST>, Mix<IsLessThan<ClashImpactF<>, Int<26000>>, TransitionEffectL<TrConcat<TrInstant, AlphaL<RgbArg<CLASH_COLOR_ARG, Rgb<255, 255, 255>>, Bump<Scale<BladeAngle<>, Scale<BladeAngle<0, 16000>, Sum<IntArg<LOCKUP_POSITION_ARG, 16000>, Int<-12000>>, Sum<IntArg<LOCKUP_POSITION_ARG, 16000>, Int<10000>>>, Sum<IntArg<LOCKUP_POSITION_ARG, 16000>, Int<-10000>>>, Scale<ClashImpactF<>, Int<12000>, Int<60000>>>>, TrFadeX<Scale<ClashImpactF<>, Int<200>, Int<400>>>>, EFFECT_CLASH>, TransitionEffectL<TrWaveX<RgbArg<CLASH_COLOR_ARG, Rgb<255, 255, 255>>, Scale<ClashImpactF<>, Int<100>, Int<400>>, Int<100>, Scale<ClashImpactF<>, Int<100>, Int<400>>, Scale<BladeAngle<>, Scale<BladeAngle<0, 16000>, Sum<IntArg<LOCKUP_POSITION_ARG, 16000>, Int<-12000>>, Sum<IntArg<LOCKUP_POSITION_ARG, 16000>, Int<10000>>>, Sum<IntArg<LOCKUP_POSITION_ARG, 16000>, Int<-10000>>>>, EFFECT_CLASH>>, LockupTrL<TransitionEffect<AlphaL<AlphaMixL<Bump<Scale<BladeAngle<>, Scale<BladeAngle<0, 16000>, Sum<IntArg<LOCKUP_POSITION_ARG, 16000>, Int<-12000>>, Sum<IntArg<LOCKUP_POSITION_ARG, 16000>, Int<10000>>>, Sum<IntArg<LOCKUP_POSITION_ARG, 16000>, Int<-10000>>>, Scale<SwingSpeed<100>, Int<14000>, Int<22000>>>, AudioFlicker<RgbArg<LOCKUP_COLOR_ARG, Rgb<255, 255, 255>>, Mix<Int<12000>, Black, RgbArg<LOCKUP_COLOR_ARG, Rgb<255, 255, 255>>>>, BrownNoiseFlicker<RgbArg<LOCKUP_COLOR_ARG, Rgb<255, 255, 255>>, Mix<Int<12000>, Black, RgbArg<LOCKUP_COLOR_ARG, Rgb<255, 255, 255>>>, 300>>, Bump<Scale<BladeAngle<>, Scale<BladeAngle<0, 16000>, Sum<IntArg<LOCKUP_POSITION_ARG, 16000>, Int<-12000>>, Sum<IntArg<LOCKUP_POSITION_ARG, 16000>, Int<10000>>>, Sum<IntArg<LOCKUP_POSITION_ARG, 16000>, Int<-10000>>>, Scale<SwingSpeed<100>, Int<14000>, Int<22000>>>>, AlphaL<AudioFlicker<RgbArg<LOCKUP_COLOR_ARG, Rgb<255, 255, 255>>, Mix<Int<20000>, Black, RgbArg<LOCKUP_COLOR_ARG, Rgb<255, 255, 255>>>>, Bump<Scale<BladeAngle<>, Scale<BladeAngle<0, 16000>, Sum<IntArg<LOCKUP_POSITION_ARG, 16000>, Int<-12000>>, Sum<IntArg<LOCKUP_POSITION_ARG, 16000>, Int<10000>>>, Sum<IntArg<LOCKUP_POSITION_ARG, 16000>, Int<-10000>>>, Scale<SwingSpeed<100>, Int<14000>, Int<18000>>>>, TrExtend<5000, TrInstant>, TrFade<5000>, EFFECT_LOCKUP_BEGIN>, TrConcat<TrJoin<TrDelay<50>, TrInstant>, Mix<IsLessThan<ClashImpactF<>, Int<26000>>, RgbArg<LOCKUP_COLOR_ARG, Rgb<255, 255, 255>>, AlphaL<RgbArg<LOCKUP_COLOR_ARG, Rgb<255, 255, 255>>, Bump<Scale<BladeAngle<>, Scale<BladeAngle<0, 16000>, Sum<IntArg<LOCKUP_POSITION_ARG, 16000>, Int<-12000>>, Sum<IntArg<LOCKUP_POSITION_ARG, 16000>, Int<10000>>>, Sum<IntArg<LOCKUP_POSITION_ARG, 16000>, Int<-10000>>>, Scale<ClashImpactF<>, Int<20000>, Int<60000>>>>>, TrFade<300>>, TrConcat<TrInstant, RgbArg<LOCKUP_COLOR_ARG, Rgb<255, 255, 255>>, TrFade<400>>, SaberBase::LOCKUP_NORMAL, Int<1>>, ResponsiveLightningBlockL<Strobe<RgbArg<LB_COLOR_ARG, Rgb<255, 255, 255>>, AudioFlicker<RgbArg<LB_COLOR_ARG, Rgb<255, 255, 255>>, Blue>, 50, 1>, TrConcat<TrExtend<200, TrInstant>, AlphaL<RgbArg<LB_COLOR_ARG, Rgb<255, 255, 255>>, Bump<Scale<BladeAngle<>, Int<10000>, Int<21000>>, Int<10000>>>, TrFade<200>>, TrConcat<TrInstant, RgbArg<LB_COLOR_ARG, Rgb<255, 255, 255>>, TrFade<400>>, Int<1>>, LockupTrL<AlphaL<TransitionEffect<RandomPerLEDFlickerL<RgbArg<DRAG_COLOR_ARG, Rgb<255, 255, 255>>>, BrownNoiseFlickerL<RgbArg<DRAG_COLOR_ARG, Rgb<255, 255, 255>>, Int<300>>, TrExtend<4000, TrInstant>, TrFade<4000>, EFFECT_DRAG_BEGIN>, SmoothStep<Scale<TwistAngle<>, IntArg<DRAG_SIZE_ARG, 28000>, Int<30000>>, Int<3000>>>, TrWipeIn<200>, TrWipe<200>, SaberBase::LOCKUP_DRAG, Int<1>>, LockupTrL<AlphaL<Stripes<2000, 4000, Mix<TwistAngle<>, RgbArg<STAB_COLOR_ARG, Rgb<255, 68, 0>>, RotateColorsX<Int<3000>, RgbArg<STAB_COLOR_ARG, Rgb<255, 68, 0>>>>, Mix<Sin<Int<50>>, Black, Mix<TwistAngle<>, RgbArg<STAB_COLOR_ARG, Rgb<255, 68, 0>>, RotateColorsX<Int<3000>, RgbArg<STAB_COLOR_ARG, Rgb<255, 68, 0>>>>>, Mix<Int<4096>, Black, Mix<TwistAngle<>, RgbArg<STAB_COLOR_ARG, Rgb<255, 68, 0>>, RotateColorsX<Int<3000>, RgbArg<STAB_COLOR_ARG, Rgb<255, 68, 0>>>>>>, SmoothStep<Scale<TwistAngle<>, IntArg<MELT_SIZE_ARG, 28000>, Int<30000>>, Int<3000>>>, TrConcat<TrExtend<4000, TrWipeIn<200>>, AlphaL<HumpFlicker<Mix<TwistAngle<>, RgbArg<STAB_COLOR_ARG, Rgb<255, 68, 0>>, RotateColorsX<Int<3000>, RgbArg<STAB_COLOR_ARG, Rgb<255, 68, 0>>>>, RotateColorsX<Int<3000>, Mix<TwistAngle<>, RgbArg<STAB_COLOR_ARG, Rgb<255, 68, 0>>, RotateColorsX<Int<3000>, RgbArg<STAB_COLOR_ARG, Rgb<255, 68, 0>>>>>, 100>, SmoothStep<Scale<TwistAngle<>, IntArg<MELT_SIZE_ARG, 28000>, Int<30000>>, Int<3000>>>, TrFade<4000>>, TrWipe<200>, SaberBase::LOCKUP_MELT, Int<1>>, InOutTrL<TrWipeX<BendTimePowInvX<IgnitionTime<300>, Mult<IntArg<IGNITION_OPTION2_ARG, 10992>, Int<98304>>>>, TrWipeInX<BendTimePowX<RetractionTime<0>, Mult<IntArg<RETRACTION_OPTION2_ARG, 10992>, Int<98304>>>>, Black>>>()`;

const UNSTABLE_BLADES_STYLE = `StylePtr<Layers<ColorSelect<IntArg<STYLE_OPTION_ARG, 0>, TrInstant, StripesX<Int<6000>, Scale<SlowNoise<Int<2000>>, Int<-1600>, Int<-3200>>, RgbArg<BASE_COLOR_ARG, Rgb<0, 0, 255>>, RandomPerLEDFlicker<Mix<Int<10280>, Black, RgbArg<BASE_COLOR_ARG, Rgb<0, 0, 255>>>, Mix<Int<1285>, Black, RgbArg<BASE_COLOR_ARG, Rgb<0, 0, 255>>>>, BrownNoiseFlicker<Mix<Int<1285>, Black, RgbArg<BASE_COLOR_ARG, Rgb<0, 0, 255>>>, Mix<Int<16384>, Black, RgbArg<BASE_COLOR_ARG, Rgb<0, 0, 255>>>, 300>, RgbArg<BASE_COLOR_ARG, Rgb<0, 0, 255>>, RandomPerLEDFlicker<Black, Mix<Int<16384>, Black, RgbArg<BASE_COLOR_ARG, Rgb<0, 0, 255>>>>, RgbArg<BASE_COLOR_ARG, Rgb<0, 0, 255>>>, StaticFire<Stripes<2500, -5000, BrownNoiseFlicker<RgbArg<BASE_COLOR_ARG, Rgb<0, 0, 255>>, Black, 20>, Mix<Int<1285>, Black, RgbArg<BASE_COLOR_ARG, Rgb<0, 0, 255>>>, BrownNoiseFlicker<Black, Mix<Int<3212>, RgbArg<BASE_COLOR_ARG, Rgb<0, 0, 255>>, White>, 70>, Mix<Int<16384>, Black, RgbArg<BASE_COLOR_ARG, Rgb<0, 0, 255>>>>, Mix<Int<10280>, Black, RgbArg<BASE_COLOR_ARG, Rgb<0, 0, 255>>>, 0, 5, 2, 3000, 0>>, TransitionEffectL<TrWaveX<RgbArg<BLAST_COLOR_ARG, Rgb<255, 255, 255>>, Scale<EffectRandomF<EFFECT_BLAST>, Int<100>, Int<400>>, Int<100>, Scale<EffectPosition<EFFECT_BLAST>, Int<100>, Int<400>>, Scale<EffectPosition<EFFECT_BLAST>, Int<28000>, Int<8000>>>, EFFECT_BLAST>, Mix<IsLessThan<ClashImpactF<>, Int<26000>>, TransitionEffectL<TrConcat<TrInstant, AlphaL<RgbArg<CLASH_COLOR_ARG, Rgb<255, 255, 255>>, Bump<Scale<BladeAngle<>, Scale<BladeAngle<0, 16000>, Sum<IntArg<LOCKUP_POSITION_ARG, 16000>, Int<-12000>>, Sum<IntArg<LOCKUP_POSITION_ARG, 16000>, Int<10000>>>, Sum<IntArg<LOCKUP_POSITION_ARG, 16000>, Int<-10000>>>, Scale<ClashImpactF<>, Int<12000>, Int<60000>>>>, TrFadeX<Scale<ClashImpactF<>, Int<200>, Int<400>>>>, EFFECT_CLASH>, TransitionEffectL<TrWaveX<RgbArg<CLASH_COLOR_ARG, Rgb<255, 255, 255>>, Scale<ClashImpactF<>, Int<100>, Int<400>>, Int<100>, Scale<ClashImpactF<>, Int<100>, Int<400>>, Scale<BladeAngle<>, Scale<BladeAngle<0, 16000>, Sum<IntArg<LOCKUP_POSITION_ARG, 16000>, Int<-12000>>, Sum<IntArg<LOCKUP_POSITION_ARG, 16000>, Int<10000>>>, Sum<IntArg<LOCKUP_POSITION_ARG, 16000>, Int<-10000>>>>, EFFECT_CLASH>>, LockupTrL<TransitionEffect<AlphaL<AlphaMixL<Bump<Scale<BladeAngle<>, Scale<BladeAngle<0, 16000>, Sum<IntArg<LOCKUP_POSITION_ARG, 16000>, Int<-12000>>, Sum<IntArg<LOCKUP_POSITION_ARG, 16000>, Int<10000>>>, Sum<IntArg<LOCKUP_POSITION_ARG, 16000>, Int<-10000>>>, Scale<SwingSpeed<100>, Int<14000>, Int<22000>>>, AudioFlicker<RgbArg<LOCKUP_COLOR_ARG, Rgb<255, 255, 255>>, Mix<Int<12000>, Black, RgbArg<LOCKUP_COLOR_ARG, Rgb<255, 255, 255>>>>, BrownNoiseFlicker<RgbArg<LOCKUP_COLOR_ARG, Rgb<255, 255, 255>>, Mix<Int<12000>, Black, RgbArg<LOCKUP_COLOR_ARG, Rgb<255, 255, 255>>>, 300>>, Bump<Scale<BladeAngle<>, Scale<BladeAngle<0, 16000>, Sum<IntArg<LOCKUP_POSITION_ARG, 16000>, Int<-12000>>, Sum<IntArg<LOCKUP_POSITION_ARG, 16000>, Int<10000>>>, Sum<IntArg<LOCKUP_POSITION_ARG, 16000>, Int<-10000>>>, Scale<SwingSpeed<100>, Int<14000>, Int<22000>>>>, AlphaL<AudioFlicker<RgbArg<LOCKUP_COLOR_ARG, Rgb<255, 255, 255>>, Mix<Int<20000>, Black, RgbArg<LOCKUP_COLOR_ARG, Rgb<255, 255, 255>>>>, Bump<Scale<BladeAngle<>, Scale<BladeAngle<0, 16000>, Sum<IntArg<LOCKUP_POSITION_ARG, 16000>, Int<-12000>>, Sum<IntArg<LOCKUP_POSITION_ARG, 16000>, Int<10000>>>, Sum<IntArg<LOCKUP_POSITION_ARG, 16000>, Int<-10000>>>, Scale<SwingSpeed<100>, Int<14000>, Int<18000>>>>, TrExtend<5000, TrInstant>, TrFade<5000>, EFFECT_LOCKUP_BEGIN>, TrConcat<TrJoin<TrDelay<50>, TrInstant>, Mix<IsLessThan<ClashImpactF<>, Int<26000>>, RgbArg<LOCKUP_COLOR_ARG, Rgb<255, 255, 255>>, AlphaL<RgbArg<LOCKUP_COLOR_ARG, Rgb<255, 255, 255>>, Bump<Scale<BladeAngle<>, Scale<BladeAngle<0, 16000>, Sum<IntArg<LOCKUP_POSITION_ARG, 16000>, Int<-12000>>, Sum<IntArg<LOCKUP_POSITION_ARG, 16000>, Int<10000>>>, Sum<IntArg<LOCKUP_POSITION_ARG, 16000>, Int<-10000>>>, Scale<ClashImpactF<>, Int<20000>, Int<60000>>>>>, TrFade<300>>, TrConcat<TrInstant, RgbArg<LOCKUP_COLOR_ARG, Rgb<255, 255, 255>>, TrFade<400>>, SaberBase::LOCKUP_NORMAL, Int<1>>, ResponsiveLightningBlockL<Strobe<RgbArg<LB_COLOR_ARG, Rgb<255, 255, 255>>, AudioFlicker<RgbArg<LB_COLOR_ARG, Rgb<255, 255, 255>>, Blue>, 50, 1>, TrConcat<TrExtend<200, TrInstant>, AlphaL<RgbArg<LB_COLOR_ARG, Rgb<255, 255, 255>>, Bump<Scale<BladeAngle<>, Int<10000>, Int<21000>>, Int<10000>>>, TrFade<200>>, TrConcat<TrInstant, RgbArg<LB_COLOR_ARG, Rgb<255, 255, 255>>, TrFade<400>>, Int<1>>, LockupTrL<AlphaL<TransitionEffect<RandomPerLEDFlickerL<RgbArg<DRAG_COLOR_ARG, Rgb<255, 255, 255>>>, BrownNoiseFlickerL<RgbArg<DRAG_COLOR_ARG, Rgb<255, 255, 255>>, Int<300>>, TrExtend<4000, TrInstant>, TrFade<4000>, EFFECT_DRAG_BEGIN>, SmoothStep<Scale<TwistAngle<>, IntArg<DRAG_SIZE_ARG, 28000>, Int<30000>>, Int<3000>>>, TrWipeIn<200>, TrWipe<200>, SaberBase::LOCKUP_DRAG, Int<1>>, LockupTrL<AlphaL<Stripes<2000, 4000, Mix<TwistAngle<>, RgbArg<STAB_COLOR_ARG, Rgb<255, 68, 0>>, RotateColorsX<Int<3000>, RgbArg<STAB_COLOR_ARG, Rgb<255, 68, 0>>>>, Mix<Sin<Int<50>>, Black, Mix<TwistAngle<>, RgbArg<STAB_COLOR_ARG, Rgb<255, 68, 0>>, RotateColorsX<Int<3000>, RgbArg<STAB_COLOR_ARG, Rgb<255, 68, 0>>>>>, Mix<Int<4096>, Black, Mix<TwistAngle<>, RgbArg<STAB_COLOR_ARG, Rgb<255, 68, 0>>, RotateColorsX<Int<3000>, RgbArg<STAB_COLOR_ARG, Rgb<255, 68, 0>>>>>>, SmoothStep<Scale<TwistAngle<>, IntArg<MELT_SIZE_ARG, 28000>, Int<30000>>, Int<3000>>>, TrConcat<TrExtend<4000, TrWipeIn<200>>, AlphaL<HumpFlicker<Mix<TwistAngle<>, RgbArg<STAB_COLOR_ARG, Rgb<255, 68, 0>>, RotateColorsX<Int<3000>, RgbArg<STAB_COLOR_ARG, Rgb<255, 68, 0>>>>, RotateColorsX<Int<3000>, Mix<TwistAngle<>, RgbArg<STAB_COLOR_ARG, Rgb<255, 68, 0>>, RotateColorsX<Int<3000>, RgbArg<STAB_COLOR_ARG, Rgb<255, 68, 0>>>>>, 100>, SmoothStep<Scale<TwistAngle<>, IntArg<MELT_SIZE_ARG, 28000>, Int<30000>>, Int<3000>>>, TrFade<4000>>, TrWipe<200>, SaberBase::LOCKUP_MELT, Int<1>>, InOutTrL<TrWipeX<BendTimePowInvX<IgnitionTime<300>, Mult<IntArg<IGNITION_OPTION2_ARG, 10992>, Int<98304>>>>, TrWipeInX<BendTimePowX<RetractionTime<0>, Mult<IntArg<RETRACTION_OPTION2_ARG, 10992>, Int<98304>>>>, Black>>>()`;

// ── The library ───────────────────────────────────────────────────────────────

export const PRESET_LIBRARY: PresetTemplate[] = [
  // ── Fett263 OS8 styles (from David_Saber2.h) ──────────────────────────────
  {
    id: 'ninth-jedi',
    name: 'Ninth Jedi',
    description: 'Kara — interactive clash counter, unlocks full power after 10 clashes',
    category: 'fett263',
    folderSuggestion: 'NinthJedi',
    trackSuggestion: '',
    previewColor: '#00ff00',
    bladeStyle: raw(NINTH_JEDI_STYLE, '#00ff00'),
  },
  {
    id: 'fallen-order',
    name: 'Fallen Order',
    description: 'Cal Kestis — pulsing blue stripes with full lockup/drag/melt effects',
    category: 'fett263',
    folderSuggestion: 'Fallen',
    trackSuggestion: '',
    previewColor: '#0066ff',
    bladeStyle: raw(FALLEN_STYLE, '#0066ff'),
  },
  {
    id: 'static',
    name: 'Static',
    description: 'Clean solid blade with Fett263 full-featured clash/lockup/blast layers',
    category: 'fett263',
    folderSuggestion: 'Static',
    trackSuggestion: '',
    previewColor: '#4488ff',
    bladeStyle: raw(STATIC_STYLE, '#4488ff'),
  },
  {
    id: 'kylo-ren',
    name: 'Kylo Ren',
    description: 'Unstable crossguard style — fire-based or stripes variant via STYLE_OPTION',
    category: 'fett263',
    folderSuggestion: 'KyloRen',
    trackSuggestion: '',
    previewColor: '#cc0000',
    bladeStyle: raw(KYLO_REN_STYLE, '#cc0000'),
  },
  {
    id: 'unstable-blades',
    name: 'Unstable Blades',
    description: 'Unstable Pulse or Unstable Unleashed — dual style options',
    category: 'fett263',
    folderSuggestion: 'UnstableBlades',
    trackSuggestion: '',
    previewColor: '#0044ff',
    bladeStyle: raw(UNSTABLE_BLADES_STYLE, '#0044ff'),
  },

  // ── Classic / simple styles (from common_presets.h and default configs) ────
  {
    id: 'classic-cyan',
    name: 'Classic Cyan',
    description: 'Simple StyleNormal — solid cyan blade with white clash flash',
    category: 'classic',
    folderSuggestion: 'hero',
    trackSuggestion: 'tracks/duel.wav',
    previewColor: '#00ffff',
    bladeStyle: raw(`StyleNormalPtr<CYAN, WHITE, 300, 800>()`, '#00ffff'),
  },
  {
    id: 'classic-red',
    name: 'Classic Red',
    description: 'Simple solid red blade — standard Vader style',
    category: 'classic',
    folderSuggestion: 'igniter/font2',
    trackSuggestion: 'tracks/vader.wav',
    previewColor: '#ff2200',
    bladeStyle: raw(`StyleNormalPtr<RED, WHITE, 300, 800>()`, '#ff2200'),
  },
  {
    id: 'classic-green',
    name: 'Classic Green',
    description: 'Green blade with spark on ignition',
    category: 'classic',
    folderSuggestion: 'igniter/font4',
    trackSuggestion: 'tracks/duel.wav',
    previewColor: '#00cc44',
    bladeStyle: raw(`StylePtr<InOutHelper<EasyBlade<OnSpark<GREEN>, WHITE>, 300, 800>>()`, '#00cc44'),
  },
  {
    id: 'fire-red-yellow',
    name: 'Fire (Red/Yellow)',
    description: 'StyleFire — animated flame effect from red to yellow',
    category: 'classic',
    folderSuggestion: 'caliban',
    trackSuggestion: 'tracks/duel.wav',
    previewColor: '#ff6600',
    bladeStyle: raw(`StyleFirePtr<RED, YELLOW>()`, '#ff6600'),
  },
  {
    id: 'fire-blue-cyan',
    name: 'Fire (Blue/Cyan)',
    description: 'Blue fire variant — cool animated flame',
    category: 'classic',
    folderSuggestion: 'font02',
    trackSuggestion: 'tracks/title.wav',
    previewColor: '#0099ff',
    bladeStyle: raw(`StyleFirePtr<BLUE, CYAN>()`, '#0099ff'),
  },
  {
    id: 'rainbow',
    name: 'Rainbow',
    description: 'Full rainbow cycle along the blade',
    category: 'classic',
    folderSuggestion: 'font02',
    trackSuggestion: 'tracks/cantina.wav',
    previewColor: '#ff00ff',
    bladeStyle: raw(`StyleRainbowPtr<300, 800>()`, '#ff00ff'),
  },
  {
    id: 'strobe-white',
    name: 'Strobe',
    description: 'Rapid white strobe over a rainbow base',
    category: 'classic',
    folderSuggestion: 'font02',
    trackSuggestion: 'tracks/cantina.wav',
    previewColor: '#ffffff',
    bladeStyle: raw(`StyleStrobePtr<WHITE, Rainbow, 15, 300, 800>()`, '#eeeeee'),
  },
  {
    id: 'audio-flicker-yellow',
    name: 'Audio Flicker',
    description: 'Yellow blade that flickers in sync with audio',
    category: 'classic',
    folderSuggestion: 'font01',
    trackSuggestion: 'tracks/walls.wav',
    previewColor: '#ffdd00',
    bladeStyle: raw(`StyleNormalPtr<AudioFlicker<YELLOW, WHITE>, BLUE, 300, 800>()`, '#ffdd00'),
  },
  {
    id: 'gradient-red-blue',
    name: 'Gradient Red→Blue',
    description: 'Colour gradient from red at the base to blue at the tip',
    category: 'classic',
    folderSuggestion: 'font02',
    trackSuggestion: 'tracks/cantina.wav',
    previewColor: '#aa00ff',
    bladeStyle: raw(`StyleNormalPtr<Gradient<RED, BLUE>, Gradient<CYAN, YELLOW>, 300, 800>()`, '#aa00ff'),
  },
  {
    id: 'pulsing-red',
    name: 'Pulsing Red',
    description: 'Red blade that slowly pulses brighter and dimmer',
    category: 'classic',
    folderSuggestion: 'font02',
    trackSuggestion: 'tracks/duel.wav',
    previewColor: '#dd0000',
    bladeStyle: raw(`StyleNormalPtr<Pulsing<RED, Rgb<50,0,0>, 5000>, WHITE, 300, 800, RED>()`, '#dd0000'),
  },
];

export const PRESET_CATEGORIES = [
  { id: 'fett263', label: 'Fett263 OS8', description: 'Full-featured ProffieOS8 styles' },
  { id: 'classic', label: 'Classic', description: 'StyleNormal / StyleFire / StyleRainbow' },
] as const;
